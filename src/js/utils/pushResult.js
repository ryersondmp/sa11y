import Lang from './lang';
import * as Utils from './utils';
import { State } from '../core/state';

export function pushResult({
  test,
  element = null,
  type = 'error',
  args = [],
  content = null,
  dismiss = '',
  dismissAll = false,
  developer = false,
  margin = null,
  inline = false,
  position = null,
  ...customProps
}) {
  // If rule is turned off, don't push to result object.
  const rule = State.option.checks[test];
  if (!rule) return null;

  // If a string is passed, we construct the tooltip. Otherwise, pass in constructed DOM node.
  const rawContent = rule.content || content || test;
  const finalContent =
    typeof rawContent === 'string' ? Lang.sprintf(rawContent, ...args) : rawContent;

  // Final issue object sent to results array.
  const result = {
    test,
    ...(element && { element }),
    type: rule.type || type,
    content: finalContent,
    ...(args.length && { args }),
    inline: rule.inline || inline,
    ...(position && { position }),
    dismiss: Utils.prepareDismissal(test + dismiss),
    dismissAll: rule.dismissAll ? test : dismissAll,
    developer: rule.developer ?? developer,
    ...(margin && { margin }),
    ...customProps,
  };
  State.results.push(result);
  return result;
}
