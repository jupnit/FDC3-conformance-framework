import { assert } from "chai";
import { openApp, OpenCommonConfig, OpenControl } from "./control/open-control";

export function getCommonOpenTests(control: OpenControl<any>, documentation: string, config: OpenCommonConfig) {
  
  const AOpensBWithContext = `(${config.prefix}AOpensBWithContext) Can open app B from app A with context and ${config.target} as config.target but app B listening for null context`;
  it(AOpensBWithContext, async () => {
    const receiver = control.contextReceiver("context-received");
    await control.openMockApp(openApp.c.name, undefined, "fdc3.instrument", true);
    await control.validateReceivedContext(await receiver, "fdc3.instrument");
    await control.closeMockApp(AOpensBWithContext);
  });

  const AOpensBWithSpecificContext = `(${config.prefix}AOpensBWithSpecificContext) Can open app B from app A with context and ${config.targetMultiple} as config.target and app B is expecting context`;
  it(AOpensBWithSpecificContext, async () => {
    const receiver = control.contextReceiver("context-received");
    await control.openMockApp(openApp.b.name, undefined, "fdc3.instrument");
    await control.validateReceivedContext(await receiver, "fdc3.instrument");
    await control.closeMockApp(AOpensBWithSpecificContext);
  });

  const AOpensBMultipleListen = `(${config.prefix}AOpensBMultipleListen) Can open app B from app A with context and ${config.targetMultiple} as config.target but app B has multiple listeners added before the correct one`;
  it(AOpensBMultipleListen, async () => {
    const receiver = control.contextReceiver("context-received");
    await control.openMockApp(openApp.f.name, undefined, "fdc3.instrument", true);
    await receiver;
    await control.validateReceivedContext(await receiver, "fdc3.instrument");
    await control.closeMockApp(AOpensBMultipleListen);
  });
}
