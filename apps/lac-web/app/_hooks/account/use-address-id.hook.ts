import useLocalStorageState from "use-local-storage-state";

const useAddressId = () => {
  return useLocalStorageState("address-id", {
    defaultValue: "",
  });
};

export default useAddressId;
