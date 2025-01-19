
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@gadgetinc/react";
 
function IndexRoute() {
  const user = useUser();  
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/signed-in");
    } else {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return null;
}

export default function () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IndexRoute />
    </Suspense>
  );
}
