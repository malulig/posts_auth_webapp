import { Row } from "antd";
import { AuthForm } from "../../components/Auth/AuthFrom";

const Auth = () => {
  return (
    <Row style={{ height: "100%", width: "100%" }} justify={"center"} align={"middle"}>
      <AuthForm />
    </Row>
  );
};

export default Auth;
