type NewUserFlowProps = {
  readonly userType: string;
};

const NewUserFlow = ({ userType }: NewUserFlowProps) => {
  return <div data-testid="register-new-user-flow">new user {userType}</div>;
};

export default NewUserFlow;
