export const renderFullPage = (webExtractor, html) => {

  return(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          <title>soso template server</title>
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
          
          </script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
  `)
}
