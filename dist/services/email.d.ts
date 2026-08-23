export declare function sendEmail(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
}): Promise<boolean>;
export declare function sendAppointmentNotification(data: {
    customerName: string;
    phone: string;
    serviceName?: string;
    preferredDate: string;
    preferredTime?: string;
    message?: string;
}): Promise<boolean>;
export declare function sendContactNotification(data: {
    name: string;
    phone: string;
    email?: string;
    service?: string;
    message: string;
}): Promise<boolean>;
//# sourceMappingURL=email.d.ts.map