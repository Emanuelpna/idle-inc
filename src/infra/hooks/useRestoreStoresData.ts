import { useBankStore } from "../stores/bankStore";
import { useBuildingsStore } from "../stores/buildingsStore";

export function useRestoreStoresData() {
  const bankStore = useBankStore();
  const buildingsStore = useBuildingsStore();

  bankStore.restoreData();
  buildingsStore.restoreData();
}
