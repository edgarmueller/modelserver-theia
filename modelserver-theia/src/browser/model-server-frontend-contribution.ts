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
import { MaybePromise } from "@theia/core";
import { FrontendApplication, FrontendApplicationContribution } from "@theia/core/lib/browser";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { inject, injectable } from "inversify";

import { ModelServerApi } from "./modelserver-api";

@injectable()
export class ModelServerFrontendContribution implements FrontendApplicationContribution {
    @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService;
    @inject(ModelServerApi) protected readonly modelServerService: ModelServerApi;

    configure(app: FrontendApplication): MaybePromise<void> {
        return this.setup();
    }

    async setup(): Promise<void> {
        const success = await this.modelServerService.initialize();
        if (success) {
            this.workspaceService.onWorkspaceChanged(e => {
                if (e[0] && e[0].uri) {
                    this.modelServerService.configure({ workspaceRoot: e[0].uri });
                }
            });
        }
    }
}
