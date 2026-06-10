import React from 'react'
import {Flex, Tree} from 'antd'
import type {DataNode} from 'antd/es/tree'
import {
    FileImageOutlined,
    FileMarkdownOutlined,
    FileOutlined,
    FileTextOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    SettingOutlined,
} from '@ant-design/icons'

// 原始文件树数据：目录 / 文件 + 右侧 suffix 图标
type FileNode = {
    key: string
    name: string
    kind: 'dir' | 'file'
    suffix?: React.ReactNode
    children?: FileNode[]
}

const fileTreeSource: FileNode[] = [
    {
        key: 'src',
        name: 'src',
        kind: 'dir',
        suffix: <SettingOutlined/>,
        children: [
            {
                key: 'src/components',
                name: 'components',
                kind: 'dir',
                suffix: <FolderOpenOutlined style={{color: '#faad14'}}/>,
                children: [
                    {key: 'src/components/Button.tsx', name: 'Button.tsx', kind: 'file', suffix: <FileOutlined/>},
                    {key: 'src/components/Tree.tsx', name: 'Tree.tsx', kind: 'file', suffix: <FileOutlined/>},
                    {
                        key: 'src/components/hooks',
                        name: 'hooks',
                        kind: 'dir',
                        children: [
                            {key: 'src/components/hooks/useToggle.ts', name: 'useToggle.ts', kind: 'file', suffix: <FileTextOutlined/>},
                        ],
                    },
                ],
            },
            {
                key: 'src/utils',
                name: 'utils',
                kind: 'dir',
                children: [
                    {key: 'src/utils/format.ts', name: 'format.ts', kind: 'file', suffix: <FileTextOutlined/>},
                    {key: 'src/utils/validate.ts', name: 'validate.ts', kind: 'file', suffix: <FileTextOutlined/>},
                ],
            },
            {key: 'src/App.tsx', name: 'App.tsx', kind: 'file', suffix: <FileOutlined/>},
            {key: 'src/main.tsx', name: 'main.tsx', kind: 'file', suffix: <FileOutlined/>},
        ],
    },
    {
        key: 'public',
        name: 'public',
        kind: 'dir',
        children: [
            {key: 'public/favicon.ico', name: 'favicon.ico', kind: 'file', suffix: <FileImageOutlined/>},
            {key: 'public/logo.svg', name: 'logo.svg', kind: 'file', suffix: <FileImageOutlined/>},
        ],
    },
    {
        key: 'docs',
        name: 'docs',
        kind: 'dir',
        children: [
            {key: 'docs/guide.md', name: 'guide.md', kind: 'file', suffix: <FileMarkdownOutlined/>},
            {key: 'docs/api.md', name: 'api.md', kind: 'file', suffix: <FileMarkdownOutlined/>},
        ],
    },
    {key: 'package.json', name: 'package.json', kind: 'file', suffix: <FileTextOutlined/>},
    {key: 'tsconfig.json', name: 'tsconfig.json', kind: 'file', suffix: <FileTextOutlined/>},
]

// 节点 title：左侧文件名，右侧 suffix 图标；blockNode 下 width:100% 才能把图标顶到最右
const renderNodeTitle = (node: FileNode) => (
    <Flex justify="space-between" align="center" gap={8} style={{width: '100%'}}>
        <span>{node.name}</span>
        <span style={{flexShrink: 0, color: 'rgba(0,0,0,0.45)'}}>
            {node.suffix ?? (node.kind === 'dir' ? <FolderOutlined/> : <FileOutlined/>)}
        </span>
    </Flex>
)

const toTreeData = (nodes: FileNode[]): DataNode[] =>
    nodes.map(node => ({
        key: node.key,
        title: renderNodeTitle(node),
        isLeaf: node.kind === 'file',
        children: node.children ? toTreeData(node.children) : undefined,
    }))

const Hello: React.FC = () => (
    <div style={{padding: 24, width: 360, border: '1px solid #f0f0f0', borderRadius: 8}}>
        <Tree
            blockNode
            defaultExpandAll
            showLine={{showLeafIcon: false}}
            treeData={toTreeData(fileTreeSource)}
        />
    </div>
)

export default Hello
