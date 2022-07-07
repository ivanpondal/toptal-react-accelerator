import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { User, UserAPI } from "../api/base";

export const CompanyDetailsGuard = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    UserAPI.me().then((userResponse) => setUser(userResponse));
  }, []);

  useEffect(() => {
    if (user?.companyDetails === null) {
      router.push({
        pathname: "/company-details",
        query: {
          firstLogin: true,
        },
      });
    }
  }, [user, router]);

  return <>{props.children}</>;
};
