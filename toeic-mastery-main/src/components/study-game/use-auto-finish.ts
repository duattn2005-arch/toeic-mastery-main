"use client";

import * as React from "react";

/** In the study flow a finished game hands over straight away (the flow
 * shows a short "next game" card) instead of waiting on its "Xong" button.
 * Calls `onFinish` once, the first time `when` becomes true. */
export function useAutoFinish(when: boolean, onFinish: () => void) {
  const firedRef = React.useRef(false);
  const onFinishRef = React.useRef(onFinish);
  React.useEffect(() => {
    onFinishRef.current = onFinish;
  });
  React.useEffect(() => {
    if (!when || firedRef.current) return;
    firedRef.current = true;
    onFinishRef.current();
  }, [when]);
}
