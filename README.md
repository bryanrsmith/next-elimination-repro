# Next.js 9.4 SSG elimination bug repro

This repo demonstrates https://github.com/zeit/next.js/issues/12819

It contains 3 SSG pages. `simple` hard-codes a single prop value in `getStaticProps`, `with-helper` uses an async helper function to calculate the same value using an external dependency (lodash), and `with-inline-helper` uses an async helper function nested within `getStaticProps` to calculate the same value. on 9.3, these pages produce bundles with nearly identical sizes (around 300b). On 9.4, `with-helper` produces a bundle that's around 25kb larger, including the lodash dependency.

Install it and build:

```bash
yarn
yarn build
```

Build output when using next@9.4:

```
Page                                                           Size     First Load JS
┌ ○ /404                                                       3.29 kB        62.3 kB
├ ● /simple                                                    295 B          59.3 kB
├ ● /with-helper                                               25 kB            84 kB
└ ● /with-inline-helper                                        303 B          59.3 kB
+ First Load JS shared by all                                  59 kB
  ├ static/pages/_app.js                                       980 B
  ├ chunks/28ce2798e84dee77d6119ab6450e64f89bd407a3.ce48fb.js  8.6 kB
  ├ chunks/8008885aac586a9d16fd7e1bce0ff9140fcef503.957234.js  2.4 kB
  ├ chunks/framework.c6faae.js                                 40 kB
  ├ runtime/main.5b7d74.js                                     6.37 kB
  └ runtime/webpack.c21266.js                                  746 B
```

Downgrading next to 9.3 produces different results.

Build output when using next@~9.3:

```
Page                                                           Size     First Load JS
┌ ○ /404                                                       3.13 kB        61.7 kB
├ ● /simple                                                    295 B          58.8 kB
├ ● /with-helper                                               268 B          58.8 kB
└ ● /with-inline-helper                                        303 B          58.8 kB
+ First Load JS shared by all                                  58.5 kB
  ├ static/pages/_app.js                                       960 B
  ├ chunks/26b97c1abff8f6c3f618bf69f5d73b7d2b50fd88.7c707e.js  8.44 kB
  ├ chunks/fddca8ab3b3f6ccc3e34fdab06c1a9cdd8e83573.957234.js  2.4 kB
  ├ chunks/framework.c6faae.js                                 40 kB
  ├ runtime/main.c62073.js                                     5.97 kB
  └ runtime/webpack.c21266.js                                  746 B
```

I've included `next@bundle-analyzer`. If you run `yarn analyze` you can see lodash being included in the client bundle when building under 9.4.
