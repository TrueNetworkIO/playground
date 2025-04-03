import * as React from "react"
import { Check, X, AlertCircle, Clock, Trash, Copy, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Log, LogStatus } from "@/hooks/useScriptRunner"

interface LogItemProps {
  log: Log
  onDelete?: (id: string) => void
}

interface LogsProps {
  logs: Log[]
  onClearAll?: () => void
  onDelete?: (id: string) => void
  maxHeight?: string
  className?: string
}

const getStatusIcon = (status: LogStatus) => {
  switch (status) {
    case LogStatus.SUCCESS:
      return <Check className="h-4 w-4 text-green-500" />
    case LogStatus.ERROR:
      return <X className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

const getStatusColor = (status: LogStatus) => {
  switch (status) {
    case LogStatus.SUCCESS:
      return "border-l-green-500 bg-green-50 dark:bg-green-900/20"
    case LogStatus.ERROR:
      return "border-l-red-500 bg-red-50 dark:bg-red-900/20"
    default:
      return "border-l-gray-500"
  }
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

const getTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  
  if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`
  }
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''} ago`
  }
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  }
  
  const days = Math.floor(hours / 24)
  return `${days} day${days !== 1 ? 's' : ''} ago`
}

const LogItem: React.FC<LogItemProps> = ({ log, onDelete }) => {
  const [copied, setCopied] = React.useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(log.message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div 
      className={cn(
        "flex items-start gap-2 p-3 text-sm border-l-4 rounded-r-md mb-2 group",
        getStatusColor(log.status)
      )}
    >
      <div className="flex-shrink-0 mt-1">
        {getStatusIcon(log.status)}
      </div>
      
      <div className="flex-grow overflow-hidden">
        <div className="font-mono break-words whitespace-pre-wrap">{log.message}</div>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3" />
            <span>{formatTimestamp(log.timestamp)}</span>
            <span className="text-gray-400">({getTimeAgo(log.timestamp)})</span>
          </div>
        </div>
      </div>
      
      <div className="flex-shrink-0 flex space-x-1">
        <button 
          onClick={handleCopy}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={copied ? "Copied" : "Copy log message"}
          title={copied ? "Copied" : "Copy log message"}
        >
          {copied ? 
            <CheckCircle className="h-4 w-4 text-green-500" /> : 
            <Copy className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100" />
          }
        </button>
        
        {onDelete && (
          <button 
            onClick={() => onDelete(log.id)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Delete log"
            title="Delete log"
          >
            <Trash className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100" />
          </button>
        )}
      </div>
    </div>
  )
}

export const Logs: React.FC<LogsProps> = ({ 
  logs, 
  onClearAll, 
  onDelete,
  maxHeight = "max-h-96",
  className
}) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const logContainerRef = React.useRef<HTMLDivElement>(null)
  
  // Auto-scroll to bottom when new logs are added
  React.useEffect(() => {
    if (logContainerRef.current && !collapsed) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs, collapsed])

  const hasLogs = logs.length > 0

  return (
    <div className={cn("rounded-md shadow-sm dark:border-gray-700", className)}>      
      {!collapsed && (
        <div 
          ref={logContainerRef}
          className={cn(
            "overflow-y-auto p-3", 
            maxHeight
          )}
        >
          {!hasLogs ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <AlertCircle className="h-8 w-8 mb-2 text-gray-400" />
              <p className="text-sm">No logs to display</p>
            </div>
          ) : (
            logs.map((log) => (
              <LogItem 
                key={log.id} 
                log={log} 
                onDelete={onDelete} 
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Logs