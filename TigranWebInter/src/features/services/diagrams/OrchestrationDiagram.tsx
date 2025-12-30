import {
    Globe,
    Layers,
    Database,
    MessageSquare,
    Zap
} from 'lucide-react';
import { GroupNode } from '../GroupNode';
import { ProductNode } from '../ProductNode';

/**
 * Orchestration Diagram - Tab 1
 * Shows Trigger → Workflow → Integrations flow
 */
export function OrchestrationDiagram() {
    return (
        <div
            className="architecture-demo-container w-full h-full min-h-[500px] bg-white border border-[#0A0A0A]/5 relative shadow-sm overflow-hidden"
            data-component="architecture-demo"
            data-tab="1"
            style={{ opacity: 1, transform: 'none' }}
        >
            {/* Corner markers on container */}
            <div className="corner-marker-container corner-top-left absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#0A0A0A] z-20" data-corner="container-top-left"></div>
            <div className="corner-marker-container corner-top-right absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#0A0A0A] z-20" data-corner="container-top-right"></div>
            <div className="corner-marker-container corner-bottom-left absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#0A0A0A] z-20" data-corner="container-bottom-left"></div>
            <div className="corner-marker-container corner-bottom-right absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#0A0A0A] z-20" data-corner="container-bottom-right"></div>

            {/* Background pattern */}
            <div className="react-flow-container absolute inset-0 z-0" data-container="react-flow-wrapper">
                <svg className="w-full h-full absolute inset-0">
                    <defs>
                        <pattern
                            id="dots-pattern-orch"
                            x="0"
                            y="0"
                            width="16"
                            height="16"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="0.6" cy="0.6" r="1" fill="#d4d4d4" />
                        </pattern>
                        <marker
                            id="arrowOrange"
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
                                style={{ stroke: 'var(--color-accent-orange)', fill: 'var(--color-accent-orange)', strokeWidth: 1 }}
                            />
                        </marker>
                        <marker
                            id="arrowBlue"
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
                                style={{ stroke: 'var(--color-accent-blue)', fill: 'var(--color-accent-blue)', strokeWidth: 1 }}
                            />
                        </marker>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-pattern-orch)" />
                </svg>

                {/* Main content container - centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative" style={{ transform: 'translate(-5px, 25px) scale(0.85)', width: '100%', height: '100%' }}>

                        {/* Group: Trigger */}
                        <GroupNode
                            id="trigger"
                            label="Trigger"
                            color="#f97316"
                            width={110}
                            height={150}
                            position={{ x: 100, y: 150 }}
                        />

                        {/* Group: Workflow */}
                        <GroupNode
                            id="workflow"
                            label="Workflow"
                            color="#3b82f6"
                            width={110}
                            height={150}
                            position={{ x: 350, y: 150 }}
                        />

                        {/* Group: Integrations */}
                        <GroupNode
                            id="integrations"
                            label="Integrations"
                            color="#ec4899"
                            width={110}
                            height={390}
                            position={{ x: 600, y: 30 }}
                        />

                        {/* Product Node: Trigger/Webhook */}
                        <ProductNode
                            id="trigger"
                            label="Trigger"
                            sublabel="Webhook"
                            icon={Globe}
                            color="#f97316"
                            position={{ x: 123, y: 170 }}
                            parentId="group-trigger"
                        />

                        {/* Product Node: Workflow/Orchestrator */}
                        <ProductNode
                            id="workflow"
                            label="Workflow"
                            sublabel="Orchestrator"
                            icon={Layers}
                            color="#3b82f6"
                            position={{ x: 373, y: 170 }}
                            parentId="group-workflow"
                        />

                        {/* Product Node: CRM */}
                        <ProductNode
                            id="crm"
                            label="CRM"
                            sublabel="Salesforce"
                            icon={Database}
                            color="#ec4899"
                            position={{ x: 623, y: 50 }}
                            parentId="group-integrations"
                        />

                        {/* Product Node: Slack */}
                        <ProductNode
                            id="slack"
                            label="Slack"
                            sublabel="Alerts"
                            icon={MessageSquare}
                            color="#ec4899"
                            position={{ x: 623, y: 170 }}
                            parentId="group-integrations"
                        />

                        {/* Product Node: Email */}
                        <ProductNode
                            id="email"
                            label="Email"
                            sublabel="Resend"
                            icon={Zap}
                            color="#ec4899"
                            position={{ x: 623, y: 290 }}
                            parentId="group-integrations"
                        />

                        {/* SVG Connections - from group edge to group edge */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                            {/* Trigger group → Workflow group */}
                            <path
                                d="M 210 225 L 350 225"
                                stroke="#f97316"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowOrange)"
                                opacity="1"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#f97316" x="-2" y="-2" opacity="1">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 210 225 L 350 225"
                                    begin="0.7s"
                                />
                            </rect>

                            {/* Workflow group → CRM (top of integrations) */}
                            <path
                                d="M 460 185 L 540 185 L 540 97 L 600 97"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowBlue)"
                                opacity="1"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#3b82f6" x="-2" y="-2" opacity="1">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 460 185 L 540 185 L 540 97 L 600 97"
                                    begin="1s"
                                />
                            </rect>

                            {/* Workflow group → Slack (center) */}
                            <path
                                d="M 460 225 L 600 225"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowBlue)"
                                opacity="1"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#3b82f6" x="-2" y="-2" opacity="1">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 460 225 L 600 225"
                                    begin="1s"
                                />
                            </rect>

                            {/* Workflow group → Email (bottom) */}
                            <path
                                d="M 460 265 L 540 265 L 540 337 L 600 337"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowBlue)"
                                opacity="1"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#3b82f6" x="-2" y="-2" opacity="1">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 460 265 L 540 265 L 540 337 L 600 337"
                                    begin="1s"
                                />
                            </rect>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Gradient overlay */}
            <div className="gradient-overlay absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-white/20 z-10" data-overlay="gradient"></div>
        </div>
    );
}
