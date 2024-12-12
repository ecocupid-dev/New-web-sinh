"use client";

import { Login } from "@/components";
import { persistor, store } from "@/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

function AuthenPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Login />
        </PersistGate>
      </Provider>
      <ToastContainer closeOnClick/>
    </QueryClientProvider>
  );
}

export default AuthenPage;
