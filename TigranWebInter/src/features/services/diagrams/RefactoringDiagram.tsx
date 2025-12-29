import {
    FileText,
    Network,
    Settings,
    Server,
    Database
} from 'lucide-react';
import { GroupNode } from '../GroupNode';
import { ProductNode } from '../ProductNode';

/**
 * Refactoring Diagram - Tab 3
 * Shows Legacy → Transform → Modern flow
 */
export function RefactoringDiagram() {
    return (
        <div
            className="architecture-demo-container w-full h-full min-h-[500px] bg-white border border-[#0A0A0A]/5 relative shadow-sm overflow-hidden"
            data-component="architecture-demo"
            data-tab="3"
            style={{ opacity: 1, transform: 'none' }}
        >
            {/* Corner markers */}
            <div className="corner-marker-container corner-top-left absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#0A0A0A] z-20"></div>
            <div className="corner-marker-container corner-top-right absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#0A0A0A] z-20"></div>
            <div className="corner-marker-container corner-bottom-left absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#0A0A0A] z-20"></div>
            <div className="corner-marker-container corner-bottom-right absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#0A0A0A] z-20"></div>

            {/* Background pattern */}
            <div className="react-flow-container absolute inset-0 z-0">
                <svg className="w-full h-full absolute inset-0">
                    <defs>
                        <pattern
                            id="dots-pattern-ref"
                            x="0"
                            y="0"
                            width="16"
                            height="16"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="0.6" cy="0.6" r="1" fill="#d4d4d4" />
                        </pattern>
                        <marker
                            id="arrowRed"
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
                                style={{ stroke: '#ef4444', fill: '#ef4444', strokeWidth: 1 }}
                            />
                        </marker>
                        <marker
                            id="arrowOrangeRef"
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
                                style={{ stroke: '#f97316', fill: '#f97316', strokeWidth: 1 }}
                            />
                        </marker>
                        <marker
                            id="arrowGreenRef"
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
                                style={{ stroke: '#22c55e', fill: '#22c55e', strokeWidth: 1 }}
                            />
                        </marker>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-pattern-ref)" />
                </svg>

                {/* Main content container - centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative" style={{ transform: 'translate(-5px, 40px) scale(0.85)', width: '100%', height: '100%' }}>

                        {/* Group: Legacy */}
                        <GroupNode
                            id="legacy"
                            label="Legacy"
                            color="#ef4444"
                            width={110}
                            height={270}
                            position={{ x: 100, y: 75 }}
                        />

                        {/* Group: Transform */}
                        <GroupNode
                            id="transform"
                            label="Transform"
                            color="#f97316"
                            width={110}
                            height={150}
                            position={{ x: 350, y: 135 }}
                        />

                        {/* Group: Modern */}
                        <GroupNode
                            id="modern"
                            label="Modern"
                            color="#22c55e"
                            width={110}
                            height={270}
                            position={{ x: 600, y: 75 }}
                        />

                        {/* Legacy Nodes */}
                        <ProductNode
                            id="sheets"
                            label="Sheets"
                            sublabel="Excel"
                            icon={FileText}
                            color="#ef4444"
                            position={{ x: 123, y: 100 }}
                        />
                        <ProductNode
                            id="manual"
                            label="Manual"
                            sublabel="Entry"
                            icon={Network}
                            color="#ef4444"
                            position={{ x: 123, y: 220 }}
                        />

                        {/* Transform Node */}
                        <ProductNode
                            id="etl"
                            label="ETL"
                            sublabel="Pipeline"
                            icon={Settings}
                            color="#f97316"
                            position={{ x: 373, y: 160 }}
                        />

                        {/* Modern Nodes */}
                        <ProductNode
                            id="api"
                            label="API"
                            sublabel="REST"
                            icon={Server}
                            color="#22c55e"
                            position={{ x: 623, y: 100 }}
                        />
                        <ProductNode
                            id="db"
                            label="DB"
                            sublabel="Supabase"
                            icon={Database}
                            color="#22c55e"
                            position={{ x: 623, y: 220 }}
                        />

                        {/* SVG Connections - from group edge to group edge with SHARP corners */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                            {/* Legacy group (from top) → Transform group - SHARP angles */}
                            <path
                                d="M 210 147 L 310 147 L 310 210 L 350 210"
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowRed)"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#ef4444" x="-2" y="-2">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 210 147 L 310 147 L 310 210 L 350 210"
                                    begin="0.7s"
                                />
                            </rect>

                            {/* Legacy group (from bottom) → Transform group - SHARP angles */}
                            <path
                                d="M 210 267 L 310 267 L 310 210 L 350 210"
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowRed)"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#ef4444" x="-2" y="-2">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 210 267 L 310 267 L 310 210 L 350 210"
                                    begin="0.7s"
                                />
                            </rect>

                            {/* Transform group → Modern group (to top) - SHARP angles */}
                            <path
                                d="M 460 189 L 550 189 L 550 147 L 600 147"
                                stroke="#f97316"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowOrangeRef)"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#f97316" x="-2" y="-2">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 460 189 L 550 189 L 550 147 L 600 147"
                                    begin="1s"
                                />
                            </rect>

                            {/* Transform group → Modern group (to bottom) - SHARP angles */}
                            <path
                                d="M 460 231 L 550 231 L 550 267 L 600 267"
                                stroke="#f97316"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="none"
                                markerEnd="url(#arrowOrangeRef)"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="10"
                                    to="0"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <rect width="4" height="4" fill="#f97316" x="-2" y="-2">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 460 231 L 550 231 L 550 267 L 600 267"
                                    begin="1s"
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
