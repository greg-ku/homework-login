import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',

          // colors: {
          // }

          fontSizes: {
            xl: '2rem',
          },

          components: {
            Input: {
              styles: (theme) => ({
                input: {
                  borderColor: theme.colors.blue[5],
                },
              })
            },
            InputWrapper: {
              styles: (theme) => ({
                label: {
                  color: theme.colors.gray[5],
                },
              }),
            },
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
