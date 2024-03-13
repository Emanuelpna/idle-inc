import { useBankStore } from "../stores/bankStore";
import { useBuildingsStore } from "../stores/buildingsStore";

export function useBackupStoresData() {
  const bankStore = useBankStore();
  const buildingsStore = useBuildingsStore();

  bankStore.backupData();
  buildingsStore.backupData();
}
