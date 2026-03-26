"use client";

import { useRef } from "react";

export default function NativeDialogDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();
  const openConfirm = () => confirmRef.current?.showModal();
  const closeConfirm = (result: boolean) => confirmRef.current?.close(result ? "confirm" : "cancel");

  return (
    <div className="w-full space-y-6">
      {/* Native <dialog> modals — actual HTML elements */}
      <dialog
        ref={dialogRef}
        className="bg-surface border border-divider text-platinum p-0 w-full max-w-md backdrop:bg-black/70"
        style={{ borderRadius: "2px" }}
      >
        <div className="px-6 py-5 border-b border-divider">
          <h3 className="text-sm font-bold text-platinum">Native &lt;dialog&gt; Element</h3>
          <p className="text-[11px] text-muted mt-1">This modal is 100% native HTML. No JavaScript trap logic.</p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-secondary leading-relaxed">
            The browser handles everything for you. Focus is trapped inside automatically. The Escape key closes it. No ARIA role needed. The backdrop is styled with CSS <code className="text-accent text-xs">::backdrop</code>.
          </p>
          <ul className="mt-4 space-y-1.5">
            {["Focus trapped inside", "Escape closes it", "::backdrop CSS pseudo-element", "role=\"dialog\" implicit", "inert applied to background"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-secondary/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4 border-t border-divider flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-accent text-black hover:bg-accent/80 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            Got it
          </button>
        </div>
      </dialog>

      <dialog
        ref={confirmRef}
        className="bg-surface border border-divider text-platinum p-0 w-full max-w-sm backdrop:bg-black/70"
        style={{ borderRadius: "2px" }}
      >
        <div className="px-6 py-5">
          <h3 className="text-sm font-bold text-platinum mb-2">Delete this item?</h3>
          <p className="text-xs text-secondary/80 leading-relaxed">
            This action cannot be undone. Using <code className="text-accent">returnValue</code> we know which button was clicked even after the dialog closes.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-divider flex justify-end gap-3">
          <button
            onClick={() => closeConfirm(false)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-divider text-muted hover:text-platinum hover:border-divider-hover transition-all"
            style={{ borderRadius: "2px" }}
          >
            Cancel
          </button>
          <button
            onClick={() => closeConfirm(true)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-red-500/80 text-white hover:bg-red-500 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            Delete
          </button>
        </div>
      </dialog>

      {/* Demo Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Modal Demo Card */}
        <div className="border border-divider bg-surface/20 p-6" style={{ borderRadius: "2px" }}>
          <div className="mb-1">
            <code className="text-[10px] text-accent font-mono">.showModal()</code>
          </div>
          <p className="text-xs text-secondary/80 mb-4">
            Opens a modal dialog. The background becomes inert. Escape key closes it. The <code className="text-accent text-[10px]">::backdrop</code> pseudo-element is available for styling.
          </p>
          <button
            onClick={openModal}
            className="w-full py-2.5 text-xs font-bold uppercase tracking-widest border border-divider text-platinum hover:border-accent/40 hover:text-accent transition-all"
            style={{ borderRadius: "2px" }}
          >
            Open Modal Dialog
          </button>
        </div>

        {/* Confirmation Demo Card */}
        <div className="border border-divider bg-surface/20 p-6" style={{ borderRadius: "2px" }}>
          <div className="mb-1">
            <code className="text-[10px] text-accent font-mono">&lt;form method=&quot;dialog&quot;&gt;</code>
          </div>
          <p className="text-xs text-secondary/80 mb-4">
            A form inside a dialog with <code className="text-accent text-[10px]">method=&quot;dialog&quot;</code> submits to the dialog and sets its <code className="text-accent text-[10px]">returnValue</code>. No extra JavaScript needed.
          </p>
          <button
            onClick={openConfirm}
            className="w-full py-2.5 text-xs font-bold uppercase tracking-widest border border-red-500/30 text-red-400 hover:border-red-500/60 hover:bg-red-500/5 transition-all"
            style={{ borderRadius: "2px" }}
          >
            Delete Something
          </button>
        </div>
      </div>

      {/* Code snippet */}
      <div className="border border-divider overflow-hidden" style={{ borderRadius: "2px" }}>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border-b border-divider">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[10px] text-muted font-mono">dialog.html</span>
        </div>
        <pre className="p-4 text-[11px] font-mono leading-relaxed text-secondary/80 overflow-x-auto bg-black/30">
          <code>{`<button onclick="dialog.showModal()">
  Open Dialog
</button>

<dialog id="dialog">
  <h2>Confirm action?</h2>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Confirm</button>
  </form>
</dialog>

<script>
  dialog.addEventListener('close', () => {
    console.log(dialog.returnValue); // "cancel" or "confirm"
  });
</script>`}</code>
        </pre>
      </div>
    </div>
  );
}
