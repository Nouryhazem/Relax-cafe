import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menu';
import { Participant, SplitItem, SplitFeeConfig, calculateTableSplit, egpToPiasters, TableSplitResult } from '../lib/split-calculator';
import { soundManager } from '../lib/sound-manager';

export type ActiveSection = 'seven' | 'menu' | 'find' | 'split';
export type AppLanguage = 'ar' | 'en';

interface AppContextType {
  section: ActiveSection;
  setSection: (sec: ActiveSection) => void;
  lang: AppLanguage;
  setLang: (l: AppLanguage) => void;
  toggleLang: () => void;
  isArabic: boolean;
  introDone: boolean;
  setIntroDone: (done: boolean) => void;
  utilityOpen: boolean;
  setUtilityOpen: (open: boolean) => void;
  // Sound controls
  soundEnabled: boolean;
  setSoundEnabled: (en: boolean) => void;
  toggleSound: () => void;
  entryScreenOpen: boolean;
  setEntryScreenOpen: (open: boolean) => void;
  chooseSoundConsent: (enable: boolean) => void;
  // Split at Seven global session state
  participants: Participant[];
  items: SplitItem[];
  fees: SplitFeeConfig;
  tableName: string;
  setTableName: (name: string) => void;
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  renameParticipant: (id: string, newName: string) => void;
  toggleParticipantPaid: (id: string) => void;
  setParticipantCoveredBy: (participantId: string, coveredById?: string) => void;
  addItemToSplit: (menuItem: MenuItem, assignedParticipantIds?: string[], round?: number) => void;
  addManualItemToSplit: (nameAr: string, priceEGP: number, assignedParticipantIds?: string[], round?: number) => void;
  updateSplitItemQuantity: (itemId: string, delta: number) => void;
  updateSplitItemAssignment: (itemId: string, assignedIds: string[], splitMode?: 'single' | 'equal') => void;
  removeSplitItem: (itemId: string) => void;
  updateFees: (feesUpdate: Partial<SplitFeeConfig>) => void;
  resetSplitSession: () => void;
  undoLastAction: () => void;
  canUndo: boolean;
  splitResult: TableSplitResult;
  // Quick notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_SPLIT = 'relax_cafe_split_session_v2';
const STORAGE_KEY_INTRO = 'relax_cafe_intro_completed_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [section, setSectionState] = useState<ActiveSection>('seven');
  const [lang, setLangState] = useState<AppLanguage>('ar');
  const [introDone, setIntroDoneState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_INTRO) === 'true';
    } catch {
      return false;
    }
  });

  const [entryScreenOpen, setEntryScreenOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [utilityOpen, setUtilityOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Split Session State (Clean empty initial state ready for delivery)
  const [tableName, setTableName] = useState<string>('ترابيزة 7');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [items, setItems] = useState<SplitItem[]>([]);
  const [fees, setFees] = useState<SplitFeeConfig>({
    servicePercentage: 0,
    taxPercentage: 0,
    tipMode: 'none',
    tipValue: 0,
    tipParticipantIds: [],
  });

  // Undo history for split sessions
  const [history, setHistory] = useState<Array<{ participants: Participant[]; items: SplitItem[]; fees: SplitFeeConfig }>>([]);

  // Load from localStorage if available, ignoring any legacy mock data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SPLIT);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear out old mock items if found
        if (
          parsed.items?.some((it: any) => typeof it.id === 'string' && it.id.startsWith('init-')) ||
          parsed.participants?.some((p: any) => p.name === 'أحمد' || p.name === 'سارة' || p.name === 'كريم')
        ) {
          localStorage.removeItem(STORAGE_KEY_SPLIT);
          setParticipants([]);
          setItems([]);
          return;
        }

        if (Array.isArray(parsed.participants)) setParticipants(parsed.participants);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.fees) setFees(parsed.fees);
        if (parsed.tableName) setTableName(parsed.tableName);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_SPLIT,
        JSON.stringify({ tableName, participants, items, fees })
      );
    } catch {
      // ignore
    }
  }, [tableName, participants, items, fees]);

  // Sync HTML lang and dir
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const pushHistory = () => {
    setHistory(prev => [...prev.slice(-8), { participants, items, fees }]);
  };

  const setSoundEnabled = (enabled: boolean) => {
    soundManager.setSoundConsent(enabled);
    setSoundEnabledState(enabled);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    showToast(next ? (lang === 'ar' ? 'تم تشغيل الصوت' : 'Sound enabled') : (lang === 'ar' ? 'تم كتم الصوت' : 'Sound muted'));
  };

  const chooseSoundConsent = (enable: boolean) => {
    setSoundEnabled(enable);
    setEntryScreenOpen(false);
  };

  const undoLastAction = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setParticipants(last.participants);
    setItems(last.items);
    setFees(last.fees);
    setHistory(prev => prev.slice(0, prev.length - 1));
    showToast(lang === 'ar' ? 'تم التراجع عن آخر إجراء' : 'Last action undone');
  };

  const setIntroDone = (done: boolean) => {
    setIntroDoneState(done);
    try {
      sessionStorage.setItem(STORAGE_KEY_INTRO, done ? 'true' : 'false');
    } catch {
      // ignore
    }
  };

  const setSection = (sec: ActiveSection) => {
    setSectionState(sec);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLang = (l: AppLanguage) => {
    setLangState(l);
  };

  const toggleLang = () => {
    setLangState(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const addParticipant = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    pushHistory();
    const newId = `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setParticipants(prev => [...prev, { id: newId, name: trimmed, isPaid: false }]);
    showToast(lang === 'ar' ? `تمت إضافة ${trimmed}` : `Added ${trimmed}`);
  };

  const removeParticipant = (id: string) => {
    pushHistory();
    setParticipants(prev => prev.filter(p => p.id !== id));
    setItems(prev =>
      prev.map(it => ({
        ...it,
        assignedParticipantIds: it.assignedParticipantIds.filter(pid => pid !== id),
      }))
    );
  };

  const renameParticipant = (id: string, newName: string) => {
    setParticipants(prev => prev.map(p => (p.id === id ? { ...p, name: newName } : p)));
  };

  const toggleParticipantPaid = (id: string) => {
    setParticipants(prev =>
      prev.map(p => (p.id === id ? { ...p, isPaid: !p.isPaid } : p))
    );
  };

  const setParticipantCoveredBy = (participantId: string, coveredById?: string) => {
    pushHistory();
    setParticipants(prev =>
      prev.map(p => (p.id === participantId ? { ...p, coveredByParticipantId: coveredById } : p))
    );
  };

  const addItemToSplit = (menuItem: MenuItem, assignedParticipantIds?: string[], round = 1) => {
    pushHistory();
    soundManager.playAddClick();
    const targetIds =
      assignedParticipantIds && assignedParticipantIds.length > 0
        ? assignedParticipantIds
        : participants.length > 0
        ? [participants[0].id]
        : [];

    const newItem: SplitItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      nameAr: menuItem.nameAr,
      unitPricePiasters: egpToPiasters(menuItem.price),
      quantity: 1,
      round,
      splitMode: targetIds.length > 1 ? 'equal' : 'single',
      assignedParticipantIds: targetIds,
    };

    setItems(prev => [...prev, newItem]);
    showToast(lang === 'ar' ? `أضيف ${menuItem.nameAr} لحساب القعدة` : `Added to table check`);
  };

  const addManualItemToSplit = (nameAr: string, priceEGP: number, assignedParticipantIds?: string[], round = 1) => {
    if (!nameAr.trim() || priceEGP <= 0) return;
    pushHistory();
    soundManager.playAddClick();
    const targetIds =
      assignedParticipantIds && assignedParticipantIds.length > 0
        ? assignedParticipantIds
        : participants.length > 0
        ? [participants[0].id]
        : [];

    const newItem: SplitItem = {
      id: `manual_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      nameAr: nameAr.trim(),
      unitPricePiasters: egpToPiasters(priceEGP),
      quantity: 1,
      round,
      splitMode: targetIds.length > 1 ? 'equal' : 'single',
      assignedParticipantIds: targetIds,
    };

    setItems(prev => [...prev, newItem]);
    showToast(lang === 'ar' ? `أضيف ${nameAr.trim()}` : `Added item`);
  };

  const updateSplitItemQuantity = (itemId: string, delta: number) => {
    soundManager.playAddClick();
    setItems(prev =>
      prev
        .map(it => {
          if (it.id === itemId) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as SplitItem[]
    );
  };

  const updateSplitItemAssignment = (itemId: string, assignedIds: string[], splitMode: 'single' | 'equal' = 'single') => {
    pushHistory();
    setItems(prev =>
      prev.map(it => {
        if (it.id === itemId) {
          return {
            ...it,
            assignedParticipantIds: assignedIds,
            splitMode: assignedIds.length > 1 ? 'equal' : splitMode,
          };
        }
        return it;
      })
    );
  };

  const removeSplitItem = (itemId: string) => {
    pushHistory();
    setItems(prev => prev.filter(it => it.id !== itemId));
    showToast(lang === 'ar' ? 'تم حذف العنصر' : 'Item removed');
  };

  const updateFees = (feesUpdate: Partial<SplitFeeConfig>) => {
    pushHistory();
    setFees(prev => ({ ...prev, ...feesUpdate }));
  };

  const resetSplitSession = () => {
    pushHistory();
    setParticipants([]);
    setItems([]);
    setFees({
      servicePercentage: 0,
      taxPercentage: 0,
      tipMode: 'none',
      tipValue: 0,
      tipParticipantIds: [],
    });
    setTableName('ترابيزة 7');
    showToast(lang === 'ar' ? 'تمت إعادة ضبط القعدة' : 'Table check reset');
  };

  const splitResult = calculateTableSplit(participants, items, fees);

  return (
    <AppContext.Provider
      value={{
        section,
        setSection,
        lang,
        setLang,
        toggleLang,
        isArabic: lang === 'ar',
        introDone,
        setIntroDone,
        utilityOpen,
        setUtilityOpen,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        entryScreenOpen,
        setEntryScreenOpen,
        chooseSoundConsent,
        participants,
        items,
        fees,
        tableName,
        setTableName,
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
        canUndo: history.length > 0,
        splitResult,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
