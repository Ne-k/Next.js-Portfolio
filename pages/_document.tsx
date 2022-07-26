import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;


    ctx.renderPage = () =>
      originalRenderPage({

        enhanceApp: (App) => App,

        enhanceComponent: (Component) => Component,
      });


      return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
