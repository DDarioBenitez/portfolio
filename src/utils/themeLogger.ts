/**
 * Theme logging utility for debugging theme changes and state
 */

export interface ThemeLogData {
    theme: string;
    isDarkMode: boolean;
    timestamp: string;
    trigger: string;
    additionalData?: Record<string, any>;
}

export class ThemeLogger {
    private static instance: ThemeLogger;
    private logs: ThemeLogData[] = [];
    private maxLogs = 50; // Keep last 50 logs

    static getInstance(): ThemeLogger {
        if (!ThemeLogger.instance) {
            ThemeLogger.instance = new ThemeLogger();
        }
        return ThemeLogger.instance;
    }

    log(data: Omit<ThemeLogData, 'timestamp'>): void {
        const logEntry: ThemeLogData = {
            ...data,
            timestamp: new Date().toISOString()
        };

        this.logs.unshift(logEntry);
        
        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(0, this.maxLogs);
        }

        // Console output with emoji and structured data
        const emoji = this.getEmojiForTrigger(data.trigger);
        console.log(`${emoji} Theme ${data.trigger}:`, {
            theme: data.theme,
            isDarkMode: data.isDarkMode,
            timestamp: logEntry.timestamp,
            ...data.additionalData
        });

        // Also log to localStorage for persistence across sessions
        this.saveToStorage();
    }

    private getEmojiForTrigger(trigger: string): string {
        const emojiMap: Record<string, string> = {
            'initialization': '🎨',
            'user_click': '🔄',
            'mutation_observer': '👁️',
            'system_change': '⚙️',
            'storage_load': '💾',
            'error': '❌'
        };
        return emojiMap[trigger] || '📝';
    }

    private saveToStorage(): void {
        try {
            localStorage.setItem('theme-logs', JSON.stringify(this.logs.slice(0, 10))); // Save only last 10
        } catch (error) {
            console.warn('Failed to save theme logs to localStorage:', error);
        }
    }

    loadFromStorage(): void {
        try {
            const stored = localStorage.getItem('theme-logs');
            if (stored) {
                const parsedLogs = JSON.parse(stored);
                this.logs = [...parsedLogs, ...this.logs];
                console.log('💾 Loaded theme logs from storage:', parsedLogs.length, 'entries');
            }
        } catch (error) {
            console.warn('Failed to load theme logs from localStorage:', error);
        }
    }

    getLogs(): ThemeLogData[] {
        return [...this.logs];
    }

    clearLogs(): void {
        this.logs = [];
        localStorage.removeItem('theme-logs');
        console.log('🗑️ Theme logs cleared');
    }

    // Utility method to log theme state changes
    logThemeChange(from: string, to: string, trigger: string, additionalData?: Record<string, any>): void {
        this.log({
            theme: to,
            isDarkMode: to === 'dark',
            trigger,
            additionalData: {
                fromTheme: from,
                ...additionalData
            }
        });
    }

    // Utility method to log theme initialization
    logThemeInit(theme: string, source: string, additionalData?: Record<string, any>): void {
        this.log({
            theme,
            isDarkMode: theme === 'dark',
            trigger: 'initialization',
            additionalData: {
                source,
                ...additionalData
            }
        });
    }
}

// Export singleton instance
export const themeLogger = ThemeLogger.getInstance();

// Initialize and load previous logs
themeLogger.loadFromStorage();



