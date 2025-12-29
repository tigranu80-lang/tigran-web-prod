import {
    MessageSquare,
    Cpu,
    Database,
    Layers3,
    Code2,
    Sparkles
} from 'lucide-react';
import { GroupNode } from '../GroupNode';
import { ProductNode } from '../ProductNode';

/**
 * AI Agents Diagram - Tab 2
 * Shows Input → Compute → Action flow
 */
export function AIAgentsDiagram() {
    return (
        <div
            className="architecture-demo-container w-full h-full min-h-[500px] bg-white border border-[#0A0A0A]/5 relative shadow-sm overflow-hidden"
            data-component="architecture-demo"
            data-tab="2"
            style={{ opacity: 1, transform: 'none' }}
        >
            {/* Corner markers on container */}
            <div className="corner-marker-container corner-top-left absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#0A0A0A] z-20"></div>
            <div className="corner-marker-container corner-top-right absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#0A0A0A] z-20"></div>
            <div className="corner-marker-container corner-bottom-left absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#0A0A0A] z-20"></div>
            <div className="corner-marker-container corner-bottom-right absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#0A0A0A] z-20"></div>

            {/* Background pattern */}
            <div className="react-flow-container absolute inset-0 z-0">
                <svg className="w-full h-full absolute inset-0">
                    <defs>
                        <pattern
                            id="dots-pattern-ai"
                            x="0"
                            y="0"
                            width="16"
                            height="16"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="0.6" cy="0.6" r="1" fill="#d4d4d4" />
                        </pattern>
                        <marker
                            id="arrowGreen"
                            markerWidth="15"
                            markerHeight="15"
                            viewBox="-10 -10 20 20"
                            markerUnits="strokeWidth"
                            orient="auto-start-reverse"
                            refX="0"
                            refY="0"
                        >
                            <polyline
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points="-5,-4 0,0 -5,4 -5,-4"
                                style={{ stroke: '#10b981', fill: '#10b981', strokeWidth: 1 }}
                            />
                        </marker>
                        <marker
                            id="arrowBlueAI"
                            markerWidth="15"
                            markerHeight="15"
                            viewBox="-10 -10 20 20"
                            markerUnits="strokeWidth"
                            orient="auto-start-reverse"
                            refX="0"
                            refY="0"
                        >
                            <polyline
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points="-5,-4 0,0 -5,4 -5,-4"
                                style={{ stroke: '#3b82f6', fill: '#3b82f6', strokeWidth: 1 }}
                            />
                        </marker>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-pattern-ai)" />
                </svg>

                {/* Main content container - centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative" style={{ transform: 'translate(-20px, 20px) scale(0.85)', width: '100%', height: '100%' }}>

                        {/* Group: Input */}
                        <GroupNode
                            id="input"
                            label="Input"
                            color="#3b82f6"
                            width={110}
                            height={150}
                            position={{ x: 80, y: 140 }}
                        />

                        {/* Group: Compute */}
                        <GroupNode
                            id="compute"
                            label="Compute"
                            color="#10b981"
                            width={260}
                            height={300}
                            position={{ x: 280, y: 65 }}
                        />

                        {/* Group: Action */}
                        <GroupNode
                            id="action"
                            label="Action"
                            color="#a855f7"
                            width={110}
                            height={150}
                            position={{ x: 630, y: 140 }}
                        />

                        {/* Input Node: USER */}
                        <ProductNode
                            id="input-user"
                            label="User"
                            sublabel="Query"
                            icon={MessageSquare}
                            color="#3b82f6"
                            position={{ x: 103, y: 158 }}
                        />

                        {/* Compute Nodes - 2x2 Grid */}
                        {/* Top Row */}
                        <ProductNode
                            id="llm"
                            label="LLM"
                            sublabel="GPT-4"
                            icon={Cpu}
                            color="#10b981"
                            position={{ x: 305, y: 93 }}
                        />
                        <ProductNode
                            id="rag"
                            label="RAG"
                            sublabel="Vector DB"
                            icon={Database}
                            color="#10b981"
                            position={{ x: 440, y: 93 }}
                        />

                        {/* Bottom Row */}
                        <ProductNode
                            id="code"
                            label="Code"
                            sublabel="Executor"
                            icon={Code2}
                            color="#10b981"
                            position={{ x: 305, y: 228 }}
                        />
                        <ProductNode
                            id="memory"
                            label="Memory"
                            sublabel="Context"
                            icon={Layers3}
                            color="#10b981"
                            position={{ x: 440, y: 228 }}
                        />

                        {/* Action Node: EXECUTE */}
                        <ProductNode
                            id="action-execute"
                            label="Execute"
                            sublabel="Actions"
                            icon={Sparkles}
                            color="#a855f7"
                            position={{ x: 653, y: 158 }}
                        />

                        {/* SVG Connections - from group edge to group edge */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                            {/* Input group → Compute group */}
                            <path
                                d="M 190 215 L 280 215"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowBlueAI)"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#3b82f6" x="-2" y="-2">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 190 215 L 280 215"
                                    begin="0.5s"
                                />
                            </rect>

                            {/* Compute group → Action group */}
                            <path
                                d="M 540 215 L 630 215"
                                stroke="#10b981"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowGreen)"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#10b981" x="-2" y="-2">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 540 215 L 630 215"
                                    begin="1.2s"
                                />
                            </rect>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Gradient overlay */}
            <div className="gradient-overlay absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-white/20 z-10"></div>
        </div>
    );
}
