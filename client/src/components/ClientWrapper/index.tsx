"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardWrapper from "@/app/dashboardWrapper";
import StoreProvider from "@/app/redux";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok && pathname !== "/login") {
          router.push("/login");
        } else {
          setIsAuthChecked(true);
        }
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname]);

  if (!isAuthChecked) return null;

  return (
    <StoreProvider>
      {pathname === "/login" ? (
        <>{children}</>
      ) : (
        <DashboardWrapper>{children}</DashboardWrapper>
      )}
    </StoreProvider>
  );
}