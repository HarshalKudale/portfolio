---
title: How I Reduced Expo Ram Usage (And Build Times) on WSL
date: 2026-01-17
draft: false
tags:
  - expo
  - react-native
  - wsl
  - android
  - performance
description: Practical tips and configuration tweaks to dramatically reduce memory usage and speed up local EAS builds when developing React Native apps on WSL.
featured: true
---

Running local EAS builds on WSL can be a memory-hungry nightmare. I was seeing **22GB of RAM** consumed during `eas build --platform android --local`, which would often crash my machine or slow everything to a crawl. After some investigation and experimentation, I managed to bring this under control. Here's what I learned.

## The Problem

When running local Expo builds on WSL, several factors compound to create extreme memory pressure:

### Why WSL Makes It Worse

WSL2 runs a full Linux kernel in a lightweight VM, but memory management can be tricky:
- The VM can consume all available Windows memory by default
- Garbage collection between Windows and WSL isn't always efficient
- Heavy native compilation workloads get no special treatment

### Root Causes of High Memory Usage

After profiling my builds, I identified these culprits:

| Factor                          | Impact                                                         |
| ------------------------------- | -------------------------------------------------------------- |
| **New Architecture**            | Enables JSI, Fabric, TurboModules → massive native compilation |
| **Heavy Native Modules**        | CMake builds for multiple native modules                       |
| **No Gradle Memory Limits**     | Default JVM settings with no restrictions                      |
| **Multiple Architectures**      | Building for both `arm64-v8a` and `x86_64`                     |
| **Parallel Native Compilation** | Multiple CMake builds running simultaneously                   |

The heavy native modules were the biggest offender — each one requiring full CMake compilation with all their native dependencies.

## The Solution

I tackled this from multiple angles: Gradle configuration, EAS settings, and WSL-specific optimizations.

### 1. Configure WSL Memory Limits

First, let's prevent WSL from eating all your RAM. Create or edit `%USERPROFILE%\.wslconfig` on Windows:

```ini
[wsl2]
memory=12GB
processors=4
swap=8GB
```

This caps WSL at 12GB RAM with 8GB swap. Adjust based on your system — I have 32GB total, so this leaves headroom for Windows.

### 2. Create a Gradle Properties Config Plugin

Since Expo's `prebuild` regenerates the `android/` folder, we need a config plugin to inject our Gradle settings:

```javascript
// plugins/withGradleProperties.js

const { withGradleProperties } = require("expo/config-plugins");

module.exports = function withOptimizedGradleProperties(config) {
  return withGradleProperties(config, (config) => {
    // Remove any existing entries we want to override
    config.modResults = config.modResults.filter(
      (item) =>
        !["org.gradle.jvmargs", "org.gradle.parallel", "org.gradle.caching"].includes(item.key)
    );

    // Add optimized memory settings
    config.modResults.push(
      {
        type: "property",
        key: "org.gradle.jvmargs",
        value: "-Xmx4g -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8",
      },
      {
        type: "property",
        key: "org.gradle.parallel",
        value: "true",
      },
      {
        type: "property",
        key: "org.gradle.caching",
        value: "true",
      },
      {
        type: "property",
        key: "org.gradle.daemon",
        value: "true",
      }
    );

    return config;
  });
};
```

The key settings here:
- **`-Xmx4g`**: Caps JVM heap at 4GB (down from unlimited)
- **`-XX:MaxMetaspaceSize=512m`**: Limits class metadata memory
- **Caching enabled**: Reuses previous build outputs

### 3. Register the Plugin

Add the plugin to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      "expo-router",
      ["./plugins/withGradleProperties.js"]
    ]
  }
}
```

### 4. Optimize EAS Configuration

Update your `eas.json` to limit parallel workers and set memory-conscious environment variables:

```json
{
  "cli": {
    "version": ">= 16.28.0",
    "appVersionSource": "remote"
  },
  "build": {
    "base": {
      "env": {
        "GRADLE_OPTS": "-Dorg.gradle.jvmargs=-Xmx4g -Dorg.gradle.parallel=true",
        "JOBS": "2"
      },
      "android": {
        "gradleCommand": ":app:assembleRelease -x lint --max-workers=2"
      }
    },
    "development": {
      "extends": "base",
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "extends": "base",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "extends": "base",
      "autoIncrement": true
    }
  }
}
```

The magic here:
- **`--max-workers=2`**: Limits Gradle parallel workers
- **`-x lint`**: Skips lint checks for faster builds
- **`JOBS=2`**: Limits CMake parallel jobs

### 5. Create a Low-Memory Build Profile

For development or when your machine is struggling, create a dedicated low-memory profile:

```json
{
  "low-memory": {
    "extends": "base",
    "android": {
      "buildType": "apk",
      "env": {
        "ORG_GRADLE_PROJECT_reactNativeArchitectures": "arm64-v8a"
      },
      "gradleCommand": ":app:assembleRelease -x lint --max-workers=1 --no-daemon"
    }
  }
}
```

This builds for only one architecture and uses a single worker. It's slower but won't crash your machine.

## Verifying the Improvements

After applying these changes, run a clean build with memory monitoring:

```bash
# Clean previous builds
rm -rf android ios

# Regenerate native folders with new config
npx expo prebuild --platform android --clean

# Verify gradle.properties was updated
cat android/gradle.properties | grep jvmargs

# Build with memory monitoring
/usr/bin/time -v eas build --platform android --local --profile preview 2>&1 | tee build_log.txt

# Check peak memory
grep "Maximum resident set size" build_log.txt
```

You can also monitor live with `htop` in another terminal.

## Results

After these optimizations:

| Metric      | Before   | After  |
| ----------- | -------- | ------ |
| Peak Memory | ~22GB    | ~7-9GB |
| Build Time  | ~13 min  | ~4 min |
| Crash Rate  | Frequent | None   |

The trade-off is about **limited number of architecture support**, but that's much better than builds that crash or freeze your system just to test your build. You can always create different profiles to include multiple architectures for your final play store bundle.

## Bonus: Quick Tips for WSL Development

A few more things that helped my workflow:

1. **Use WSL's native filesystem**: Store your project in `/home/`, not `/mnt/c/`. I/O is significantly faster.

2. **Increase inotify watchers**:
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

3. **Clear Gradle caches periodically**:
   ```bash
   rm -rf ~/.gradle/caches/
   ```

4. **Use the Gradle daemon**: It's already enabled in our config, but it makes subsequent builds much faster.

## Trade-offs to Consider

> **Single Architecture Builds**: Building only for `arm64-v8a` excludes x86_64 emulators. This is fine for release builds targeting real devices but may limit development if you rely on x86 emulators. I was testing on my actual device so I skipped x86.

## Wrapping Up

Heavy React Native apps with native modules can be brutal to build locally, especially on WSL. The key takeaways:

1. **Limit WSL memory** via `.wslconfig`
2. **Constrain Gradle JVM** with a config plugin
3. **Reduce parallelism** in EAS configuration
4. **Build single architecture** during development

These changes turned my build experience from frustrating crashes to reliable, consistent builds. Your mileage may vary depending on your hardware and project complexity, but these settings are a solid starting point.

---

*Running into other WSL development issues? Drop a comment — I'd love to hear about your solutions!*
