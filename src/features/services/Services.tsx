import { CoreFunctions } from "./CoreFunctions";
import { UseCases } from "./UseCases";
import { Blueprints } from "./Blueprints";

export function Services() {
  return (
    <>
      <CoreFunctions />
      <UseCases />
      <Blueprints />
    </>
  );
}