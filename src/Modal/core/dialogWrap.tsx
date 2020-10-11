import React from 'react';
import { createPortal } from 'react-dom';
import Dialog, { DialogProps, IStringOrHtmlElement } from './dialog';

let isRender: boolean = false;

export default (props: DialogProps) => {
  const { visible, forceRender, getContainer } = props;

  if (getContainer === false) {
    return <Dialog {...props} />;
  }

  if (isRender || visible || forceRender) {
    isRender = true;
    const parentNode =
      getContainer === undefined ? document.body : getParentNode(getContainer);
    return createPortal(<Dialog {...props} />, parentNode);
  }
  return null;
};

function getParentNode(
  getContainer: IStringOrHtmlElement | (() => IStringOrHtmlElement),
): Element {
  if (typeof getContainer === 'string') {
    return document.querySelectorAll(getContainer)[0];
  }

  if (typeof getContainer === 'function') {
    return getParentNode(getContainer);
  }

  if (
    typeof getContainer === 'object' &&
    getContainer instanceof window.HTMLElement
  ) {
    return getContainer;
  }
  return document.body;
}
