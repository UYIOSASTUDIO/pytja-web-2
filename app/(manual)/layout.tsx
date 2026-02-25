import ManualShell from "./ManualShell";

export default function ManualGroupLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    return <ManualShell>{children}</ManualShell>;
}
