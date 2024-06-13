import {CalendarTemplate, CustomComponentMeta, CustomComponents} from "../types/custom-components";

export const createCustomComponentFn =
  (
    setCustomComponent: (component: CustomComponentMeta) => void,
    customComponent: CalendarTemplate,
    componentName: keyof CustomComponents
  ) =>
    (wrapperElement: HTMLElement, props: Record<string, unknown>) => {
      const componentMeta: CustomComponentMeta = {
        Component: customComponent,
        wrapperElement,
        props: props,
        componentName,
      }
      setCustomComponent(componentMeta)
    }
