import useLocalStorageState from "use-local-storage-state";

const useAccountNo = () => {
  return useLocalStorageState("account-no", {
    defaultValue: "",
  });
};

export default useAccountNo;
