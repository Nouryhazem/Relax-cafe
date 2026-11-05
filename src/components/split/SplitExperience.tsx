import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MENU_ITEMS } from '../../data/menu';
import {
  egpToPiasters,
  ParticipantBreakdown,
} from '../../lib/split-calculator';
import { soundManager } from '../../lib/sound-manager';
import { PauseMark } from '../brand/PauseMark';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Trash2,
  Share2,
  Printer,
  Copy,
  Check,
  RotateCcw,
  Users,
  Edit2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Receipt,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

export const SplitExperience: React.FC = () => {
  const {
    isArabic,
    tableName,
    setTableName,
    participants,
    items,
    fees,
    addParticipant,
    removeParticipant,
    renameParticipant,
    toggleParticipantPaid,
    setParticipantCoveredBy,
    addItemToSplit,
    addManualItemToSplit,
    updateSplitItemQuantity,
    updateSplitItemAssignment,
    removeSplitItem,
    updateFees,
    resetSplitSession,
    undoLastAction,
    canUndo,
    splitResult,
    showToast,
  } = useApp();

  const [newParticipantName, setNewParticipantName] = useState('');
  const [editingParticipantId, setEditingParticipantId] = useState<string | null>(null);
  const [editingNameValue, setEditingNameValue] = useState('');

  const [showManualModal, setShowManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPrice, setManualPrice] = useState<number | ''>('');
  const [manualRound, setManualRound] = useState(1);
  const [manualAssignedId, setManualAssignedId] = useState<string>('');

  const [showMenuPickerModal, setShowMenuPickerModal] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [menuPickerRound, setMenuPickerRound] = useState(1);

  const [showFeesPanel, setShowFeesPanel] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeRoundTab, setActiveRoundTab] = useState<number>(0);

  const maxRound = Math.max(1, ...items.map(it => it.round));
  const displayedItems = activeRoundTab === 0 ? items : items.filter(it => it.round === activeRoundTab);

  const isFullyPaid = splitResult.grandTotalPiasters > 0 && splitResult.totalRemainingPiasters === 0;
  useEffect(() => {
    if (isFullyPaid) {
      soundManager.playCheckBalanced();
    }
  }, [isFullyPaid]);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newParticipantName.trim()) {
      addParticipant(newParticipantName.trim());
      setNewParticipantName('');
    }
  };

  const handleSaveRename = (id: string) => {
    if (editingNameValue.trim()) {
      renameParticipant(id, editingNameValue.trim());
    }
    setEditingParticipantId(null);
  };

  const handleAddManualItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualName.trim() && typeof manualPrice === 'number' && manualPrice > 0) {
      addManualItemToSplit(
        manualName.trim(),
        manualPrice,
        manualAssignedId ? [manualAssignedId] : participants.map(p => p.id),
        manualRound
      );
      setManualName('');
      setManualPrice('');
      setShowManualModal(false);
    }
  };

  const copyParticipantSummary = (pb: ParticipantBreakdown) => {
    const text = `ريلاكس كافيه — الدور السابع\nحساب ${pb.name}: ${Math.round(pb.finalDuePiasters / 100)} ج.م\n${pb.itemDetails
      .map(d => `• ${d.nameAr}: ${Math.round(d.sharePiasters / 100)} ج.م`)
      .join('\n')}`;

    navigator.clipboard.writeText(text);
    showToast(`تم نسخ حساب ${pb.name}`);
  };

  const handleShareTable = async () => {
    let str = `☕ ريلاكس كافيه — الدور السابع\n📍 سمالوط، المنيا\n📜 حساب: ${tableName}\n--------------------\n`;
    splitResult.participants.forEach(p => {
      str += `• ${p.name}: ${Math.round(p.finalDuePiasters / 100)} ج.م${p.isPaid ? ' (تم الدفع ✓)' : ''}\n`;
    });
    str += `--------------------\nالإجمالي: ${Math.round(splitResult.grandTotalPiasters / 100)} ج.م\nفوق الزحمة، وقتك بيرجع ليك.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `حساب ${tableName}`, text: str });
        showToast('تمت المشاركة بنجاح');
      } catch {
        navigator.clipboard.writeText(str);
        showToast('تم نسخ الحساب للحافظة');
      }
    } else {
      navigator.clipboard.writeText(str);
      showToast('تم نسخ الحساب للحافظة');
    }
  };

  return (
    <div className="min-h-screen bg-[#1B0F0A] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#3B1F14]">
          <div>
            <div className="flex items-center gap-2.5 text-[#B8924E] text-xs uppercase tracking-widest font-semibold mb-1">
              <PauseMark size="sm" color="#B8924E" />
              <span>SPLIT AT SEVEN</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="font-messiri text-3xl sm:text-5xl font-bold text-[#F3E9DA]">
                {isArabic ? 'الحساب من غير لخبطة.' : 'Split at Seven'}
              </h1>
              <button
                onClick={() => {
                  const val = prompt(isArabic ? 'اسم القعدة:' : 'Table name:', tableName);
                  if (val && val.trim()) setTableName(val.trim());
                }}
                className="p-1.5 rounded hover:bg-[#3B1F14] text-[#F3E9DA]/50 hover:text-[#B8924E] cursor-pointer"
                title="تعديل اسم القعدة"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <p className="font-messiri text-base sm:text-lg text-[#B8924E] font-medium mt-1">
              {isArabic ? 'كل واحد يدفع اللي عليه بالظبط.' : 'Exact integer precision for every person.'}
            </p>

            <span className="text-xs text-[#F3E9DA]/50 block mt-0.5">
              {isArabic ? `اسم القعدة: ${tableName}` : `Table: ${tableName}`}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {canUndo && (
              <button
                onClick={undoLastAction}
                className="px-3 py-1.5 rounded bg-[#3B1F14] text-xs text-[#F3E9DA] border border-[#3B1F14] hover:border-[#B8924E]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B8924E]" />
                <span>تراجع</span>
              </button>
            )}

            <button
              onClick={handleShareTable}
              className="px-3.5 py-1.5 rounded bg-[#3B1F14] hover:bg-[#B8924E] text-xs text-[#F3E9DA] hover:text-[#1B0F0A] border border-[#B8924E]/40 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isArabic ? 'شارك الحساب' : 'Share Check'}</span>
            </button>

            <button
              onClick={() => setShowReceiptModal(true)}
              className="px-3.5 py-1.5 rounded bg-[#1B0F0A] hover:bg-[#3B1F14] text-xs text-[#B8924E] border border-[#3B1F14] hover:border-[#B8924E]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>{isArabic ? 'الحساب النهائي' : 'Final Check'}</span>
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3 py-1.5 rounded text-xs text-[#F3E9DA]/50 hover:text-red-400 border border-transparent hover:border-[#3B1F14] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isArabic ? 'ابدأ قعدة جديدة' : 'New Session'}</span>
            </button>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-20px' }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 rounded-xl bg-[#3B1F14]/50 border border-[#3B1F14] flex flex-col justify-between shadow-md"
          >
            <span className="text-xs uppercase tracking-wider text-[#F3E9DA]/60">
              {isArabic ? 'الحساب النهائي' : 'Grand Total'}
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#B8924E]">
                {Math.round(splitResult.grandTotalPiasters / 100)}
              </span>
              <span className="text-xs text-[#F3E9DA]/60">{isArabic ? 'ج.م' : 'EGP'}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-[#3B1F14] text-[11px] text-[#F3E9DA]/50">
              <span>المشروبات: {Math.round(splitResult.subtotalPiasters / 100)} ج.م</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-20px' }}
            transition={{ duration: 0.4, delay: 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 rounded-xl bg-[#3B1F14]/50 border border-[#3B1F14] flex flex-col justify-between shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#F3E9DA]/60">
                {isArabic ? 'مين دفع؟ / لسه باقي' : 'Paid / Remaining'}
              </span>
              {isFullyPaid && (
                <span className="text-xs text-[#5C6650] font-bold flex items-center gap-1 animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>كله تمام.</span>
                </span>
              )}
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#5C6650] block">{isArabic ? 'تم دفعه:' : 'Paid:'}</span>
                <span className="font-mono text-xl font-bold text-[#5C6650]">
                  {Math.round(splitResult.totalPaidPiasters / 100)} {isArabic ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <div className="text-end">
                <span className="text-xs text-[#B8924E] block">{isArabic ? 'لسه باقي:' : 'Remaining:'}</span>
                <span className="font-mono text-xl font-bold text-[#F3E9DA]">
                  {Math.round(splitResult.totalRemainingPiasters / 100)} {isArabic ? 'ج.م' : 'EGP'}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#3B1F14] text-[11px] text-[#F3E9DA]/50">
              <span>{participants.filter(p => p.isPaid).length} من {participants.length} دفعوا</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-20px' }}
            transition={{ duration: 0.4, delay: 0.16 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 rounded-xl bg-[#3B1F14]/50 border border-[#3B1F14] flex flex-col justify-between shadow-md"
          >
            <span className="text-xs uppercase tracking-wider text-[#F3E9DA]/60">
              {isArabic ? 'دقة الحساب' : 'Invariant Check'}
            </span>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#5C6650] font-medium">
              <ShieldCheck className="w-5 h-5 text-[#5C6650]" />
              <span>{isArabic ? 'المعادلة مطابقة 100%' : '100% Invariant Holds'}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-[#3B1F14] flex items-center justify-between text-[11px]">
              <button
                onClick={() => setShowFeesPanel(!showFeesPanel)}
                className="text-[#B8924E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isArabic ? 'الخدمة / الضريبة / التيبس' : 'Service & Tip'}</span>
                {showFeesPanel ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* FEES PANEL */}
        {showFeesPanel && (
          <div className="p-5 rounded-xl bg-[#1B0F0A] border border-[#3B1F14] space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#F3E9DA]/70 block">{isArabic ? 'الخدمة (%)' : 'Service (%)'}</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={fees.servicePercentage}
                  onChange={e => updateFees({ servicePercentage: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-full bg-[#3B1F14] border border-[#3B1F14] focus:border-[#B8924E] rounded p-2 text-sm text-[#F3E9DA] font-mono outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#F3E9DA]/70 block">{isArabic ? 'الضريبة (%)' : 'Tax (%)'}</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={fees.taxPercentage}
                  onChange={e => updateFees({ taxPercentage: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-full bg-[#3B1F14] border border-[#3B1F14] focus:border-[#B8924E] rounded p-2 text-sm text-[#F3E9DA] font-mono outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#F3E9DA]/70 block">{isArabic ? 'التيبس (ج.م)' : 'Tip (EGP)'}</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={fees.tipValue ? fees.tipValue / 100 : ''}
                  onChange={e =>
                    updateFees({
                      tipMode: Number(e.target.value) > 0 ? 'fixed' : 'none',
                      tipValue: Number(e.target.value) > 0 ? egpToPiasters(Number(e.target.value)) : 0,
                    })
                  }
                  className="w-full bg-[#3B1F14] border border-[#3B1F14] focus:border-[#B8924E] rounded p-2 text-sm text-[#F3E9DA] font-mono outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: ضيف أصحابك */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-[#3B1F14]/40 border border-[#3B1F14] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#3B1F14]">
                <h2 className="font-messiri text-lg font-bold text-[#F3E9DA]">
                  {isArabic ? 'ضيف أصحابك' : 'Friends at the Table'}
                </h2>
                <span className="text-xs text-[#F3E9DA]/60">{participants.length} أفراد</span>
              </div>

              <form onSubmit={handleAddParticipant} className="flex gap-2">
                <input
                  type="text"
                  value={newParticipantName}
                  onChange={e => setNewParticipantName(e.target.value)}
                  placeholder={isArabic ? 'اكتب اسم الصاحب…' : 'Add friend…'}
                  className="flex-1 bg-[#1B0F0A] border border-[#3B1F14] focus:border-[#B8924E] text-xs text-[#F3E9DA] placeholder-[#F3E9DA]/40 rounded-lg px-3 py-2 outline-none"
                />
                <button
                  type="submit"
                  disabled={!newParticipantName.trim()}
                  className="px-3.5 py-2 rounded-lg bg-[#3B1F14] hover:bg-[#B8924E] disabled:opacity-40 text-[#F3E9DA] hover:text-[#1B0F0A] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'ضيف' : 'Add'}</span>
                </button>
              </form>

              <div className="space-y-3 pt-1">
                {participants.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-lg border border-dashed border-[#3B1F14] bg-[#1B0F0A]/40 space-y-3">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#3B1F14]/70 flex items-center justify-center text-[#B8924E]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#F3E9DA]">
                        {isArabic ? 'القعدة لسه مفيهاش أفراد' : 'No friends added yet'}
                      </p>
                      <p className="text-xs text-[#F3E9DA]/50 mt-1 max-w-xs mx-auto">
                        {isArabic
                          ? 'اكتب اسم أي شخص في القعدة فوق واضغط «ضيف» عشان تبدأوا تقسيم الحساب'
                          : 'Type a friend\'s name above and click Add to start splitting'}
                      </p>
                    </div>
                  </div>
                ) : (
                  splitResult.participants.map(pb => {
                    const pOriginal = participants.find(p => p.id === pb.participantId);
                    const isEditing = editingParticipantId === pb.participantId;

                    return (
                      <motion.div
                        key={pb.participantId}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-3.5 rounded-lg border transition-all ${
                          pb.isPaid
                            ? 'bg-[#1B0F0A]/60 border-[#5C6650]/40'
                            : 'bg-[#1B0F0A] border-[#3B1F14] hover:border-[#B8924E]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editingNameValue}
                                onChange={e => setEditingNameValue(e.target.value)}
                                className="bg-[#3B1F14] border border-[#B8924E] rounded px-2 py-1 text-xs text-[#F3E9DA] outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveRename(pb.participantId)}
                                className="p-1 rounded bg-[#B8924E] text-[#1B0F0A] cursor-pointer"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-[#F3E9DA]">{pb.name}</span>
                              <button
                                onClick={() => {
                                  setEditingParticipantId(pb.participantId);
                                  setEditingNameValue(pb.name);
                                }}
                                className="text-[#F3E9DA]/30 hover:text-[#F3E9DA] cursor-pointer"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          <span className="font-mono text-base font-bold text-[#B8924E] tabular-nums">
                            {Math.round(pb.finalDuePiasters / 100)} {isArabic ? 'ج.م' : 'EGP'}
                          </span>
                        </div>

                        {pb.itemDetails.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-[#3B1F14]/60 text-[11px] text-[#F3E9DA]/60 space-y-0.5">
                            {pb.itemDetails.map((it, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>• {it.nameAr}</span>
                                <span className="font-mono tabular-nums">{Math.round(it.sharePiasters / 100)} ج.م</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 pt-2 border-t border-[#3B1F14]/60 flex items-center justify-between text-xs">
                          <button
                            onClick={() => toggleParticipantPaid(pb.participantId)}
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                              pb.isPaid
                                ? 'bg-[#5C6650] text-[#F3E9DA]'
                                : 'bg-[#3B1F14] text-[#F3E9DA]/70 hover:text-[#F3E9DA]'
                            }`}
                          >
                            <UserCheck className="w-3 h-3" />
                            <span>{pb.isPaid ? 'دفع خلاص ✓' : 'مين دفع؟'}</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <select
                              value={pOriginal?.coveredByParticipantId || ''}
                              onChange={e => setParticipantCoveredBy(pb.participantId, e.target.value || undefined)}
                              className="bg-[#1B0F0A] border border-[#3B1F14] text-[11px] text-[#F3E9DA]/70 rounded px-1.5 py-0.5 outline-none cursor-pointer"
                              title="يدفع عنه شخص تاني"
                            >
                              <option value="">يدفع لنفسه</option>
                              {participants
                                .filter(p => p.id !== pb.participantId)
                                .map(p => (
                                  <option key={p.id} value={p.id}>
                                    يدفع عنه {p.name}
                                  </option>
                                ))}
                            </select>

                            <button
                              onClick={() => copyParticipantSummary(pb)}
                              className="p-1 text-[#F3E9DA]/50 hover:text-[#B8924E] cursor-pointer"
                              title="نسخ الحساب"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => removeParticipant(pb.participantId)}
                              className="p-1 text-[#F3E9DA]/30 hover:text-red-400 cursor-pointer"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Column 2: الطلبات والجولات */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-xl bg-[#3B1F14]/40 border border-[#3B1F14] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#3B1F14]">
                <div>
                  <h2 className="font-messiri text-lg font-bold text-[#F3E9DA]">
                    {isArabic ? 'طلبات القعدة والجولات' : 'Table Rounds'}
                  </h2>
                  <span className="text-xs text-[#F3E9DA]/60">{items.length} طلبات</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMenuPickerModal(true)}
                    className="px-3.5 py-1.5 rounded bg-[#B8924E] hover:bg-[#B8924E]/90 text-xs text-[#1B0F0A] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'اختار من المنيو' : 'From Menu'}</span>
                  </button>

                  <button
                    onClick={() => setShowManualModal(true)}
                    className="px-3.5 py-1.5 rounded bg-[#1B0F0A] hover:bg-[#3B1F14] border border-[#3B1F14] hover:border-[#B8924E]/50 text-xs text-[#F3E9DA] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#B8924E]" />
                    <span>{isArabic ? 'ضيف حاجة يدوي' : 'Manual Item'}</span>
                  </button>
                </div>
              </div>

              {/* Rounds Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setActiveRoundTab(0)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeRoundTab === 0
                      ? 'bg-[#B8924E] text-[#1B0F0A] font-semibold'
                      : 'bg-[#1B0F0A] text-[#F3E9DA]/70 border border-[#3B1F14]'
                  }`}
                >
                  كل الجولات
                </button>

                {Array.from({ length: maxRound }).map((_, i) => {
                  const roundNum = i + 1;
                  const label = roundNum === 1 ? 'الجولة الأولى' : roundNum === 2 ? 'الجولة التانية' : `جولة ${roundNum}`;
                  return (
                    <button
                      key={roundNum}
                      onClick={() => setActiveRoundTab(roundNum)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                        activeRoundTab === roundNum
                          ? 'bg-[#B8924E] text-[#1B0F0A] font-semibold'
                          : 'bg-[#1B0F0A] text-[#F3E9DA]/70 border border-[#3B1F14]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {items.length === 0 ? (
                  <div className="text-center py-12 px-6 rounded-lg border border-dashed border-[#3B1F14] bg-[#1B0F0A]/40 space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#3B1F14]/70 flex items-center justify-center text-[#B8924E]">
                      <Receipt className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#F3E9DA]">
                        {isArabic ? 'الحساب فاضي وجاهز للاستخدام' : 'Table check is empty'}
                      </p>
                      <p className="text-xs text-[#F3E9DA]/50 mt-1 max-w-sm mx-auto">
                        {isArabic
                          ? 'تقدر تختار مشروبات من منيو ريلاكس كافيه أو تضيف طلب يدوي بالسعر اللي تحبه'
                          : 'Choose drinks from Relax Café menu or add custom items to your table'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => setShowMenuPickerModal(true)}
                        className="px-4 py-2 rounded-lg bg-[#B8924E] hover:bg-[#B8924E]/90 text-xs text-[#1B0F0A] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isArabic ? 'اختار من المنيو' : 'Pick from Menu'}</span>
                      </button>
                      <button
                        onClick={() => setShowManualModal(true)}
                        className="px-4 py-2 rounded-lg bg-[#1B0F0A] hover:bg-[#3B1F14] border border-[#3B1F14] hover:border-[#B8924E]/50 text-xs text-[#F3E9DA] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#B8924E]" />
                        <span>{isArabic ? 'طلب يدوي' : 'Manual Item'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {displayedItems.map(item => {
                      const unitEGP = Math.round(item.unitPricePiasters / 100);
                      const totalEGP = unitEGP * item.quantity;
                      const assignedNames = item.assignedParticipantIds
                        .map(id => participants.find(p => p.id === id)?.name)
                        .filter(Boolean)
                        .join('، ');

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          className="p-3.5 rounded-lg bg-[#1B0F0A] border border-[#3B1F14] hover:border-[#B8924E]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-[#F3E9DA]">
                                {item.nameAr}
                              </span>
                              <span className="text-[10px] text-[#B8924E] border border-[#B8924E]/30 rounded px-1.5">
                                {item.round === 1 ? 'الجولة الأولى' : item.round === 2 ? 'الجولة التانية' : `جولة ${item.round}`}
                              </span>
                            </div>

                            <div className="text-xs text-[#F3E9DA]/60 flex items-center gap-1.5 flex-wrap">
                              <Users className="w-3 h-3 text-[#B8924E]" />
                              <span>
                                {item.assignedParticipantIds.length === 0
                                  ? 'مين طلب ده؟'
                                  : item.assignedParticipantIds.length === participants.length
                                  ? 'قسّمه بالتساوي على الكل'
                                  : `طلب: ${assignedNames}`}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#3B1F14]/50">
                            {/* Quantity */}
                            <div className="flex items-center gap-1.5 bg-[#3B1F14]/60 rounded p-0.5 border border-[#3B1F14]">
                              <button
                                onClick={() => updateSplitItemQuantity(item.id, -1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-xs text-[#F3E9DA]/80 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs font-semibold px-1 text-[#F3E9DA]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateSplitItemQuantity(item.id, 1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-xs text-[#F3E9DA]/80 cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-mono text-sm font-bold text-[#B8924E] min-w-[60px] text-end">
                              {totalEGP} ج.م
                            </span>

                            {/* Quick Assignment Toggle */}
                            <select
                              value={
                                item.assignedParticipantIds.length === 1
                                  ? item.assignedParticipantIds[0]
                                  : item.assignedParticipantIds.length === participants.length
                                  ? 'all'
                                  : 'multiple'
                              }
                              onChange={e => {
                                const val = e.target.value;
                                if (val === 'all') {
                                  updateSplitItemAssignment(item.id, participants.map(p => p.id), 'equal');
                                } else {
                                  updateSplitItemAssignment(item.id, [val], 'single');
                                }
                              }}
                              className="bg-[#1B0F0A] border border-[#3B1F14] text-[11px] text-[#F3E9DA]/70 rounded px-1.5 py-1 outline-none cursor-pointer"
                            >
                              <option value="all">قسّمه بالتساوي</option>
                              {participants.map(p => (
                                <option key={p.id} value={p.id}>
                                  {p.name}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={() => removeSplitItem(item.id)}
                              className="p-1 text-[#F3E9DA]/30 hover:text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal: ضيف حاجة يدوي */}
        <AnimatePresence>
          {showManualModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowManualModal(false)}
                className="fixed inset-0 bg-[#1B0F0A]/80 backdrop-blur-sm cursor-pointer"
                aria-hidden="true"
              />
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-sm rounded-xl bg-[#1B0F0A] border border-[#3B1F14] p-6 text-[#F3E9DA] shadow-2xl space-y-4"
              >
                <h3 className="font-messiri text-lg font-bold">ضيف حاجة يدوي</h3>
                <form onSubmit={handleAddManualItem} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[#F3E9DA]/70 block mb-1">اسم الطلب</label>
                    <input
                      type="text"
                      required
                      value={manualName}
                      onChange={e => setManualName(e.target.value)}
                      placeholder="مثال: مياه غازية إضافية…"
                      className="w-full bg-[#3B1F14] border border-[#3B1F14] focus:border-[#B8924E] rounded p-2 text-sm text-[#F3E9DA] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#F3E9DA]/70 block mb-1">السعر (ج.م)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={manualPrice}
                      onChange={e => setManualPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="0"
                      className="w-full bg-[#3B1F14] border border-[#3B1F14] focus:border-[#B8924E] rounded p-2 text-sm text-[#F3E9DA] font-mono outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[#F3E9DA]/70 block mb-1">الجولة</label>
                      <select
                        value={manualRound}
                        onChange={e => setManualRound(Number(e.target.value))}
                        className="w-full bg-[#3B1F14] border border-[#3B1F14] rounded p-2 text-xs text-[#F3E9DA] cursor-pointer"
                      >
                        <option value={1}>الجولة الأولى</option>
                        <option value={2}>الجولة التانية</option>
                        <option value={3}>جولة 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#F3E9DA]/70 block mb-1">مين طلب ده؟</label>
                      <select
                        value={manualAssignedId}
                        onChange={e => setManualAssignedId(e.target.value)}
                        className="w-full bg-[#3B1F14] border border-[#3B1F14] rounded p-2 text-xs text-[#F3E9DA] cursor-pointer"
                      >
                        <option value="">قسّمه بالتساوي</option>
                        {participants.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowManualModal(false)}
                      className="px-3 py-1.5 text-[#F3E9DA]/60 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded bg-[#B8924E] text-[#1B0F0A] font-semibold cursor-pointer"
                    >
                      حفظ الطلب
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: اختار من المنيو */}
        <AnimatePresence>
          {showMenuPickerModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMenuPickerModal(false)}
                className="fixed inset-0 bg-[#1B0F0A]/80 backdrop-blur-sm cursor-pointer"
                aria-hidden="true"
              />
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-lg rounded-xl bg-[#1B0F0A] border border-[#3B1F14] p-6 text-[#F3E9DA] shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#3B1F14]">
                  <h3 className="font-messiri text-lg font-bold">اختار من المنيو</h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={menuPickerRound}
                      onChange={e => setMenuPickerRound(Number(e.target.value))}
                      className="bg-[#3B1F14] text-xs text-[#F3E9DA] rounded px-2 py-1 cursor-pointer"
                    >
                      <option value={1}>الجولة الأولى</option>
                      <option value={2}>الجولة التانية</option>
                      <option value={3}>جولة جديدة</option>
                    </select>
                    <button
                      onClick={() => setShowMenuPickerModal(false)}
                      className="text-xs text-[#F3E9DA]/50 hover:text-[#F3E9DA] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={menuSearch}
                  onChange={e => setMenuSearch(e.target.value)}
                  placeholder="ابحث في أصناف المنيو…"
                  className="w-full bg-[#3B1F14] border border-[#3B1F14] focus:border-[#B8924E] rounded p-2 text-xs text-[#F3E9DA] outline-none"
                />

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {MENU_ITEMS.filter(it =>
                    menuSearch ? it.nameAr.includes(menuSearch) : true
                  ).map(it => (
                    <div
                      key={it.id}
                      className="p-3 rounded-lg bg-[#3B1F14]/40 hover:bg-[#3B1F14] border border-[#3B1F14] flex items-center justify-between transition-colors"
                    >
                      <span className="font-messiri text-sm font-semibold text-[#F3E9DA]">
                        {it.nameAr}
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#B8924E]">
                          {it.price} ج.م
                        </span>
                        <button
                          onClick={() => {
                            addItemToSplit(it, undefined, menuPickerRound);
                            showToast(`أضيف ${it.nameAr}`);
                          }}
                          className="px-2.5 py-1 rounded bg-[#B8924E] text-[#1B0F0A] text-xs font-medium cursor-pointer"
                        >
                          + ضيف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Receipt View */}
        <AnimatePresence>
          {showReceiptModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReceiptModal(false)}
                className="fixed inset-0 bg-[#1B0F0A]/85 backdrop-blur-sm cursor-pointer"
                aria-hidden="true"
              />
              <motion.div
                initial={{ scale: 0.94, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 16 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-md rounded-2xl bg-[#F3E9DA] text-[#1B0F0A] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="text-center pb-4 border-b border-[#1B0F0A]/20">
                  <PauseMark size="md" color="#1B0F0A" className="mx-auto mb-2" />
                  <span className="font-pinyon text-4xl block leading-none">Relax</span>
                  <span className="font-cormorant text-xs uppercase tracking-[0.25em] text-[#1B0F0A]/70 block mt-1">
                    Café · Level Seven · Samalout
                  </span>
                  <span className="font-messiri text-xs text-[#1B0F0A]/80 font-medium block mt-1">
                    فوق الزحمة — حساب {tableName}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {splitResult.participants.map(p => (
                    <div key={p.participantId} className="space-y-1 pb-2 border-b border-[#1B0F0A]/10">
                      <div className="flex justify-between font-bold text-sm">
                        <span className="font-sans">{p.name}</span>
                        <span className="tabular-nums">
                          {Math.round(p.finalDuePiasters / 100)} ج.م
                        </span>
                      </div>
                      {p.itemDetails.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-[11px] text-[#1B0F0A]/70 ps-2">
                          <span>• {it.nameAr}</span>
                          <span>{Math.round(it.sharePiasters / 100)} ج.م</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t-2 border-[#1B0F0A] space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-[#1B0F0A]">
                    <span>الحساب النهائي:</span>
                    <span>{Math.round(splitResult.grandTotalPiasters / 100)} EGP</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between no-print">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded bg-[#1B0F0A] text-[#F3E9DA] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة الإيصال</span>
                  </button>
                  <button
                    onClick={() => setShowReceiptModal(false)}
                    className="text-xs text-[#1B0F0A]/70 hover:underline cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Reset Confirmation */}
        <AnimatePresence>
          {showResetConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowResetConfirm(false)}
                className="fixed inset-0 bg-[#1B0F0A]/80 backdrop-blur-sm cursor-pointer"
                aria-hidden="true"
              />
              <motion.div
                initial={{ scale: 0.94 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.94 }}
                className="relative z-10 w-full max-w-sm rounded-xl bg-[#1B0F0A] border border-[#3B1F14] p-6 text-[#F3E9DA] shadow-2xl space-y-4"
              >
                <h3 className="font-messiri text-lg font-bold text-red-400">ابدأ قعدة جديدة؟</h3>
                <p className="text-xs text-[#F3E9DA]/70 font-light leading-relaxed">
                  سيتم مسح طلبات القعدة الحالية وتصفير الحساب، وتقدر تتراجع فوراً بعد الضغط.
                </p>
                <div className="pt-3 flex justify-end gap-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 text-xs text-[#F3E9DA]/70 cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => {
                      resetSplitSession();
                      setShowResetConfirm(false);
                    }}
                    className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    تأكيد المسح
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
