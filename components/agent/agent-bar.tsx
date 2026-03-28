'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/hooks/use-i18n';
import { useSettingsStore } from '@/lib/store/settings';
import { useAgentRegistry } from '@/lib/orchestration/registry/store';
import { Sparkles, ChevronDown, ChevronUp, Shuffle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function AgentBar() {
  const { t } = useI18n();
  const { listAgents } = useAgentRegistry();
  const selectedAgentIds = useSettingsStore((s) => s.selectedAgentIds);
  const setSelectedAgentIds = useSettingsStore((s) => s.setSelectedAgentIds);
  const maxTurns = useSettingsStore((s) => s.maxTurns);
  const setMaxTurns = useSettingsStore((s) => s.setMaxTurns);
  const agentMode = useSettingsStore((s) => s.agentMode);
  const setAgentMode = useSettingsStore((s) => s.setAgentMode);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const allAgents = listAgents();
  // In preset mode, only show default (non-generated) agents
  const agents = allAgents.filter((a) => !a.isGenerated);
  const teacherAgent = agents.find((a) => a.role === 'teacher');
  const selectedAgents = agents.filter((a) => selectedAgentIds.includes(a.id));
  const nonTeacherSelected = selectedAgents.filter((a) => a.role !== 'teacher');

  // Click-outside to collapse
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleModeChange = (mode: 'preset' | 'auto') => {
    setAgentMode(mode);
    if (mode === 'preset') {
      // Ensure a teacher is always selected in preset mode
      const hasTeacherSelected = selectedAgentIds.some((id) => {
        const a = agents.find((agent) => agent.id === id);
        return a?.role === 'teacher';
      });
      if (!hasTeacherSelected && teacherAgent) {
        setSelectedAgentIds([teacherAgent.id, ...selectedAgentIds]);
      }
    }
  };

  const toggleAgent = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (agent?.role === 'teacher') return; // teacher is always selected
    if (selectedAgentIds.includes(agentId)) {
      setSelectedAgentIds(selectedAgentIds.filter((id) => id !== agentId));
    } else {
      setSelectedAgentIds([...selectedAgentIds, agentId]);
    }
  };

  const getAgentName = (agent: { id: string; name: string }) => {
    const key = `settings.agentNames.${agent.id}`;
    const translated = t(key);
    return translated !== key ? translated : agent.name;
  };

  const getAgentRole = (agent: { role: string }) => {
    const key = `settings.agentRoles.${agent.role}`;
    const translated = t(key);
    return translated !== key ? translated : agent.role;
  };

  /* ── Shared avatar row — always visible on the right side ── */
  const avatarRow = !mounted ? (
    // Render placeholder during SSR/initial hydration to prevent mismatch
    <div className="flex items-center gap-1 shrink-0">
      {teacherAgent && (
        <div className="size-7 rounded-full overflow-hidden ring-[1.5px] ring-violet-400/40 shrink-0">
          <img
            src={teacherAgent.avatar}
            alt={getAgentName(teacherAgent)}
            className="size-full object-cover"
          />
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center gap-1 shrink-0">
      {/* Teacher avatar — always shown */}
      {teacherAgent && (
        <div className="size-7 rounded-full overflow-hidden ring-[1.5px] ring-violet-400/40 shrink-0">
          <img
            src={teacherAgent.avatar}
            alt={getAgentName(teacherAgent)}
            className="size-full object-cover"
          />
        </div>
      )}

      {agentMode === 'auto' ? (
        <>
          {/* In auto mode: show assistant avatar + shuffle indicator */}
          <div className="flex -space-x-1.5">
            {agents.find((a) => a.role === 'assistant') && (
              <div className="size-5 rounded-full overflow-hidden ring-[1px] ring-background">
                <img
                  src={agents.find((a) => a.role === 'assistant')!.avatar}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            )}
          </div>
          <Shuffle className="size-3.5 text-violet-400" />
        </>
      ) : (
        <>
          {/* In preset mode: show selected non-teacher agents */}
          {nonTeacherSelected.length > 0 && (
            <div className="flex -space-x-1.5">
              {nonTeacherSelected.slice(0, 4).map((agent) => (
                <div
                  key={agent.id}
                  className="size-5 rounded-full overflow-hidden ring-[1px] ring-background"
                >
                  <img
                    src={agent.avatar}
                    alt={getAgentName(agent)}
                    className="size-full object-cover"
                  />
                </div>
              ))}
              {nonTeacherSelected.length > 4 && (
                <div className="size-5 rounded-full bg-slate-700 ring-[1px] ring-background flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-400">
                    +{nonTeacherSelected.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-auto max-w-[320px]">
      {/* ── Header row — always in document flow ── */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              'group flex items-center gap-2 cursor-pointer rounded-full px-3.5 py-2 transition-all',
              'border border-white/10 text-[#888888] hover:text-gray-200 hover:bg-white/5',
            )}
            onClick={() => setOpen(!open)}
          >
            {/* Left side — text changes based on open/close */}
            <span className="text-[12px] text-[#888888] group-hover:text-gray-300 transition-colors sm:block font-medium text-left" suppressHydrationWarning>
              {open ? t('agentBar.expandedTitle') : t('agentBar.readyToLearn')}
            </span>

            {/* Right side — avatars always visible */}
            {avatarRow}

            {/* Chevron */}
            {open ? (
              <ChevronUp className="size-3 text-gray-500 group-hover:text-gray-400 transition-colors" />
            ) : (
              <ChevronDown className="size-3 text-gray-500 group-hover:text-gray-400 transition-colors" />
            )}
          </button>
        </TooltipTrigger>
        {!open && (
          <TooltipContent side="bottom" sideOffset={4}>
            <span suppressHydrationWarning>{t('agentBar.configTooltip')}</span>
          </TooltipContent>
        )}
      </Tooltip>

      {/* ── Expanded panel (absolute, floating above the header) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 bottom-full mb-1 z-50 w-80"
          >
            <div className="rounded-2xl bg-slate-800/95 backdrop-blur-sm ring-1 ring-white/[0.06] shadow-[0_-4px_16px_-2px_rgba(0,0,0,0.3)] px-2.5 py-2">
              {/* Mode tabs — full width, 50/50 */}
              <div className="flex rounded-lg border border-white/10 bg-slate-900/50 p-0.5 mb-2.5">
                <button
                  onClick={() => handleModeChange('preset')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-medium rounded-md transition-all text-center',
                    agentMode === 'preset'
                      ? 'bg-slate-700 shadow-sm text-white'
                      : 'text-gray-400 hover:text-gray-200',
                  )}
                  suppressHydrationWarning
                >
                  {t('settings.agentModePreset')}
                </button>
                <button
                  onClick={() => handleModeChange('auto')}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-medium rounded-md transition-all text-center flex items-center justify-center gap-1',
                    agentMode === 'auto'
                      ? 'bg-slate-700 shadow-sm text-white'
                      : 'text-gray-400 hover:text-gray-200',
                  )}
                  suppressHydrationWarning
                >
                  <Sparkles className="h-3 w-3" />
                  {t('settings.agentModeAuto')}
                </button>
              </div>

              {agentMode === 'preset' ? (
                /* Agent list — teacher is always selected, no need to show */
                <div className="max-h-72 overflow-y-auto -mx-1">
                  {agents
                    .filter((a) => a.role !== 'teacher')
                    .map((agent) => {
                      const isSelected = selectedAgentIds.includes(agent.id);
                      return (
                        <div
                          key={agent.id}
                          onClick={() => toggleAgent(agent.id)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 text-left transition-colors cursor-pointer rounded-lg',
                            isSelected ? 'bg-teal-500/10' : 'hover:bg-white/5',
                          )}
                        >
                          <Checkbox checked={isSelected} className="pointer-events-none" />
                          <div
                            className="size-8 rounded-full overflow-hidden shrink-0 ring-1 ring-white/20"
                            style={{
                              boxShadow: isSelected ? `0 0 0 2px ${agent.color}30` : undefined,
                            }}
                          >
                            <img
                              src={agent.avatar}
                              alt={getAgentName(agent)}
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-200 flex items-center gap-1.5" suppressHydrationWarning>
                              {getAgentName(agent)}
                              <span className="text-[10px] text-gray-500 font-normal">
                                {getAgentRole(agent)}
                              </span>
                            </div>
                            {(() => {
                              const descKey = `settings.agentDescriptions.${agent.id}`;
                              const desc = t(descKey);
                              return desc !== descKey ? (
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed" suppressHydrationWarning>
                                  {desc}
                                </p>
                              ) : null;
                            })()}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                /* Auto-generate mode */
                <div className="flex flex-col items-center pt-6 pb-2 gap-8">
                  {/* Shuffle icon with ambient animation */}
                  <div className="relative flex items-center justify-center">
                    {/* Ping ripple */}
                    <div className="absolute size-12 rounded-full bg-teal-400/15 animate-ping [animation-duration:3s]" />
                    {/* Soft glow ring */}
                    <div className="absolute size-14 rounded-full bg-teal-400/10 animate-pulse [animation-duration:2.5s]" />
                    {/* Icon */}
                    <Shuffle className="relative size-7 text-teal-400" />
                  </div>
                  <p className="text-xs text-gray-400 text-center" suppressHydrationWarning>
                    {t('settings.agentModeAutoDesc')}
                  </p>
                </div>
              )}

              {/* Max turns — always visible */}
              <div className="pt-2.5 mt-2.5 border-t border-white/10 flex items-center gap-3">
                <span className="text-xs text-gray-400 shrink-0" suppressHydrationWarning>
                  {t('settings.maxTurns')}
                </span>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={maxTurns}
                  onChange={(e) => setMaxTurns(e.target.value)}
                  className="w-16 h-7 text-xs bg-slate-700/50 border-white/10 text-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
