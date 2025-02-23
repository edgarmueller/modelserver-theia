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
import { LaunchOptions } from "@modelserver/theia";
import { ContainerModule, injectable } from "inversify";
import { join, resolve } from "path";

export default new ContainerModule(bind => {
    bind(LaunchOptions).to(SimpleLaunchOptions).inSingletonScope();
});

@injectable()
export class SimpleLaunchOptions implements LaunchOptions {
    isRunning = true;
    baseURL: string = "api/v1/";
    serverPort: number = 8081;
    hostname: string = "localhost";
    jarPath = resolve(join(__dirname, '..', '..', 'build', 'com.eclipsesource.modelserver.example-0.0.1-SNAPSHOT-standalone'));
    additionArgs = ["-e"];

}

