import { State } from "@enums/StateEnum";
import { IBasicState } from "@interfaces/IBasicState";

import { Badge } from "primereact/badge";

export default function BasicStates({ state }: IBasicState) {
  switch (state) {
    case State.TO_DO:
      return <Badge value="Por hacer" severity="success"></Badge>;

    case State.COMPLETED:
      return <Badge value="Completada" severity="info"></Badge>;

    default:
      return <Badge value="-"></Badge>;
  }
}
