/********************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { FrontendApplicationContribution, WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";

import { MODEL_SERVER_BACKEND_PATH, ModelServerBackend } from "../common/model-server-backend";
import { ModelServerFrontendContribution } from "./model-server-frontend-contribution";
import { DefaultModelServerApi, ModelServerApi } from "./modelserver-api";

export default new ContainerModule(bind => {
    bind(ModelServerFrontendContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(ModelServerFrontendContribution);
    bind(ModelServerApi).to(DefaultModelServerApi).inSingletonScope();
    bind(ModelServerBackend).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<ModelServerBackend>(MODEL_SERVER_BACKEND_PATH);
    }).inSingletonScope();
});
