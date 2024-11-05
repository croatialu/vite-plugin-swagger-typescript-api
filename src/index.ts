import { PluginOption } from 'vite'
import { generateApi, GenerateApiParams } from 'swagger-typescript-api'
import path from 'path'

export interface GenerateApiOption extends GenerateApiParams {
    /**
     * 是否使用 @tanstack/vue-query 或 @tanstack/react-query
     * @default undefined
     */
    query?: 'vue' | 'react'
}

const computeExtraTemplates = (name: string, query: GenerateApiOption['query'], modular: boolean) => {
    if (!query) {
        return []
    }

    const [filename] = name.split('.')

    const queryFilename = `${filename}.query.ts`

    const templateFilename = query ? `${query}-query${modular ? '-modular' : ''}.ejs` : 'query.ejs'
    return [{
        name: queryFilename,
        path: path.resolve(process.cwd(), 'node_modules/@croatialu/query-templates/dist', templateFilename),
    }]
}


function vitePluginSwaggerTypescriptApi(option: GenerateApiOption): PluginOption {
    if (!option) {
        return false
    }
    return {
        name: 'vite-plugin-swagger-typescript-api',
        enforce: 'pre', // 前置调用
        apply: 'serve', // 仅在开发环境调用
        buildStart() {

            const defaultExtraTemplates = computeExtraTemplates(option.name, option.query, option.modular)

            generateApi({
                ...option,
                extraTemplates: [...defaultExtraTemplates, ...option.extraTemplates],
            })
                .catch((error: unknown) => {
                    console.error(error)
                })
        },
    }
}

export { vitePluginSwaggerTypescriptApi }
export default vitePluginSwaggerTypescriptApi
