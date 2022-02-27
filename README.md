<center><img src=".github/banner.png" /></center>

> A browser extension to visually preview your meta tags.

![Version](https://img.shields.io/github/package-json/v/chrrs/meta-tags-inspector?style=flat-square)
![Lints](https://img.shields.io/github/checks-status/chrrs/meta-tags-inspector/master?style=flat-square)

I got tired of deploying my projects tens of times just to get my meta tags looking perfect. Now this extension exists, which shows a bunch of tiny recreations of various applications which display links using meta tags, for example using OpenGraph.

## Building

After installing all dependencies using `yarn`, you can build the extension using

```sh
yarn release
```

This will put two ZIP files in the `release` directory, one for Manifest v2 and one for Manifest v3.

> **Note:** You'll probably not need to do this, as the only use for these ZIP files is to upload them to a browser extension store. To actually load the extension in your browser while developing, please read the next section.

## Development setup

After installing all dependencies using `yarn`, you can start the development server using

```sh
yarn dev
```

This will do two things:

-   Start a development server (running on port `10001` by default), serving the `devtools` folder. Going to `localhost:10001/panel.html` will show the devtools panel in a separate window. You can change the meta tags by temporarily editing the value for `tags` in `App.tsx`.
-   Build a live-reloading extension for manifest v3 and v2. You can load this in Chrome by going to `chrome://extensions` and in Firefox by going to `about:debugging`. After editing a file, it should automatically reload and after closing and re-opening the devtools panel, the changes should be reflected.

> **Note:** Sometimes the auto-reload function will not work properly, in this case you should manually reload the extension, reload the page and try again.

## Credits

-   The [twitter cards documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) for existing.
-   [rollup-plugin-chrome-extension](https://github.com/extend-chrome/rollup-plugin-chrome-extension/) for making a pretty awesome Rollup / Vite plugin.
