"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const nodes = [
  { id: "input", label: "INPUT", x: 50, y: 150, type: "source" },
  { id: "process1", label: "TIMECODE", x: 200, y: 80, type: "process" },
  { id: "process2", label: "AUTOMATION", x: 200, y: 220, type: "process" },
  { id: "router", label: "ROUTER", x: 350, y: 150, type: "router" },
  { id: "output1", label: "LIGHTING", x: 500, y: 50, type: "output" },
  { id: "output2", label: "VIDEO", x: 500, y: 150, type: "output" },
  { id: "output3", label: "AUDIO", x: 500, y: 250, type: "output" },
]

const connections = [
  { from: "input", to: "process1" },
  { from: "input", to: "process2" },
  { from: "process1", to: "router" },
  { from: "process2", to: "router" },
  { from: "router", to: "output1" },
  { from: "router", to: "output2" },
  { from: "router", to: "output3" },
]

export function WorkflowSimulator() {
  const [activeNodes, setActiveNodes] = useState<string[]>(["input"])
  const [signalPath, setSignalPath] = useState<number>(0)

  useEffect(() => {
    const sequence = [
      ["input"],
      ["input", "process1", "process2"],
      ["process1", "process2", "router"],
      ["router", "output1", "output2", "output3"],
      ["output1", "output2", "output3"],
    ]

    const interval = setInterval(() => {
      setSignalPath((prev) => {
        const next = (prev + 1) % sequence.length
        setActiveNodes(sequence[next])
        return next
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  const getNodePosition = (id: string) => {
    const node = nodes.find((n) => n.id === id)
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
  }

  return (
    <div className="relative w-full h-[320px] bg-black/30 border border-border overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid-dense opacity-50" />

      {/* Header */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-engineering-green animate-pulse" />
        <span className="font-mono text-xs text-engineering-green">SIGNAL FLOW SIMULATOR</span>
      </div>

      {/* Latency indicator */}
      <div className="absolute top-3 right-3 font-mono text-xs text-muted-foreground">
        LATENCY: <span className="text-engineering-green">{"<"}1ms</span>
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320">
        {/* Connection lines */}
        {connections.map((conn, i) => {
          const from = getNodePosition(conn.from)
          const to = getNodePosition(conn.to)
          const isActive = activeNodes.includes(conn.from) && activeNodes.includes(conn.to)

          return (
            <g key={i}>
              <line
                x1={from.x + 40}
                y1={from.y}
                x2={to.x - 40}
                y2={to.y}
                stroke={isActive ? "#059669" : "#262626"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
              />
              {isActive && (
                <motion.circle
                  r={4}
                  fill="#059669"
                  initial={{ cx: from.x + 40, cy: from.y }}
                  animate={{ cx: to.x - 40, cy: to.y }}
                  transition={{ duration: 0.6, ease: "linear" }}
                />
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeNodes.includes(node.id)
          return (
            <g key={node.id}>
              <motion.rect
                x={node.x - 40}
                y={node.y - 20}
                width={80}
                height={40}
                fill={isActive ? "rgba(5, 150, 105, 0.2)" : "rgba(26, 26, 26, 0.8)"}
                stroke={isActive ? "#059669" : "#262626"}
                strokeWidth={isActive ? 2 : 1}
                animate={{ scale: isActive ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill={isActive ? "#059669" : "#a1a1a1"}
                fontSize={10}
                fontFamily="monospace"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Status bar */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <div className="flex gap-4 font-mono text-xs">
          <span className="text-muted-foreground">
            NODES: <span className="text-foreground">{nodes.length}</span>
          </span>
          <span className="text-muted-foreground">
            ACTIVE: <span className="text-engineering-green">{activeNodes.length}</span>
          </span>
        </div>
        <div className="font-mono text-xs text-muted-foreground">100% UPTIME</div>
      </div>
    </div>
  )
}
