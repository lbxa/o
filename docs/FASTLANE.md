# Fastlane

The EAS cloud stores all bundled source code in S3 buckets and costs money to run after a certain number of builds.

To avoid this we can ship our app locally using [fastlane](https://docs.fastlane.tools/). Setting up the local environment on MacOS is important.

1. Install a non-system version of ruby using [rbenv](https://github.com/rbenv/rbenv)
2. Install the bundler gem using `gem install bundler`
3. Prebuild native code `pnpm expo prebuild`
4. Initialise fastlane (repeat for android)

   ```bash
   cd ios
   bundler init
   bundler add fastlane
   bundler install
   fastlane init
   ```

   You will be prompted to login to your Apple ID and select a few settings.

5. Deploy to TestFlight with `fastlane beta`
