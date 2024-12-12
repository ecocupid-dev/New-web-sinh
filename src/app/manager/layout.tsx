"use client";

import { ManagerHeader, SideBar, Validation } from "@/components";
import { gereralSans, lator } from "@/config";
import { Layout } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
import "./globals.css";

const queryClient = new QueryClient();

const { Content } = Layout;

function ManagerLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const handleToggleMenu = () => setCollapsed(!collapsed);

  return (
    <html lang="en">
      <body className={clsx(lator.className, gereralSans.variable)}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Validation>
                <Layout>
                  <SideBar collapsed={collapsed} />
                  <Layout>
                    <ManagerHeader
                      collapsed={collapsed}
                      handleToggleMenu={handleToggleMenu}
                    />
                    <Content className={"manager-main"}>{children}</Content>
                  </Layout>
                </Layout>
                <ToastContainer closeOnClick/>
              </Validation>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default ManagerLayout;
