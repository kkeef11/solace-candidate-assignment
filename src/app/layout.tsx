"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#265b4e",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#265b4e",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#265b4e",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#265b4e",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#265b4e",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#265b4e",
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Solace Candidate Assignment</title>
      </head>
      <body className={inter.className}>
        <header className="bg-solace-green h-12 flex justify-center items-center text-white font-extralight text-sm">
          <p>Solace Advocates are covered by your </p>
          <div className="h-4 w-4 ml-2 mr-1 flex justify-center items-center">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <p>
            <b>Medicare </b> plan, find yours below!
          </p>
        </header>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
