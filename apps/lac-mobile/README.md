# Wurth LAC Mobile

# Building locally

[EAS Build](https://docs.expo.dev/build/introduction/) doesn't read the environment variables so we have to expose them through the [dotenv-cli](https://www.npmjs.com/package/dotenv-cli).

```shell
dotenv -c -- eas build --platform android --profile qa --local
```
