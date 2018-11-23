/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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

import * as path from 'path';
import { injectable } from 'inversify';
import { DebugConfiguration } from '@theia/debug/lib/common/debug-configuration';
import { JavaExtensionContribution } from '@theia/java/lib/node';
import { AbstractVSCodeDebugAdapterContribution } from '@theia/debug/lib/node/vscode/vscode-debug-adapter-contribution';

@injectable()
export class JavaDebugAdapterContribution extends AbstractVSCodeDebugAdapterContribution implements JavaExtensionContribution {

    constructor() {
        super(
            'java',
            path.join(__dirname, '../../download/java-debug/extension')
        );
    }

    async getExtensionBundles(): Promise<string[]> {
        const debuggerContribution: {
            contributes: { javaExtensions: string[] }
            // tslint:disable-next-line:no-any
        } = <any>(await this.debuggerContribution);
        return debuggerContribution.contributes.javaExtensions.map(javaExtPath =>
            path.resolve(this.extensionPath, javaExtPath)
        );
    }

    provideDebugConfigurations(workspaceFolderUri?: string): DebugConfiguration[] {
        // TODO
        return [];
    }

    async resolveDebugConfiguration(config: DebugConfiguration, workspaceFolderUri?: string): Promise<DebugConfiguration | undefined> {
        // TODO
        return config;
    }

}
