export const reportStatus = {
    pending: 'Chờ xử lý',
    in_progress: 'Đang xử lý',
    resolved: 'Đã xử lý',
    closed: 'Đã giải quyết',
}

export type ReportStatusKey = keyof typeof reportStatus;

export const reportStatusColor: { [key in ReportStatusKey]: { textColor: string; bgColor: string } } = {
    pending: {
        textColor: 'text-[#FFA500]',
        bgColor: 'bg-[rgba(255,165,0,0.15)]'
    },
    in_progress: {
        textColor: 'text-[#007BFF]',
        bgColor: 'bg-[rgba(0,123,255,0.15)]'
    },
    resolved: {
        textColor: 'text-[#28A745]',
        bgColor: 'bg-[rgba(40,167,69,0.15)]'
    },
    closed: {
        textColor: 'text-[#DC3545]',
        bgColor: 'bg-[rgba(220,53,69,0.15)]'
    },
}

export const taskStatus = {
    not_received: 'Chưa nhận',
    received: 'Đã nhận',
    in_progress: 'Đang xử lý',
    completed: 'Đã phản hồi',
    cancelled: 'Đã hủy',
}

export type TaskStatusKey = keyof typeof taskStatus;

export const taskStatusColor: { [key in TaskStatusKey]: { textColor: string; bgColor: string } } = {
    not_received: {
        textColor: 'text-[#FFA500]',
        bgColor: 'bg-[rgba(255,165,0,0.15)]'
    },
    received: {
        textColor: 'text-[#007BFF]',
        bgColor: 'bg-[rgba(0,123,255,0.15)]'
    },
    in_progress: {
        textColor: 'text-[#007BFF]',
        bgColor: 'bg-[rgba(0,123,255,0.15)]'
    },
    completed: {
        textColor: 'text-[#28A745]',
        bgColor: 'bg-[rgba(40,167,69,0.15)]'
    },
    cancelled: {
        textColor: 'text-[#DC3545]',
        bgColor: 'bg-[rgba(220,53,69,0.15)]'
    },
}
