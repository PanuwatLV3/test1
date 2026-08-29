import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  Facebook,
  Globe,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  User,
} from "lucide-react";

import facebookQr from "@/assets/faebookqrcode.png";
import lineQr from "@/assets/lineqrcode.jfif";
import wechatQr from "@/assets/wechatqrcode.jfif";
import { useLanguage, type LanguageCode } from "@/lib/i18n";

const title = "My Peng Shen Profile";
const description =
  "Panuwat Klinsukhon (Owen) — Intelligent Engineer personnel card.";

const contactDetails = {
  WeChat: {
    id: "Panuwat_LV999",
    qr: wechatQr,
    actionLabel: "Add WeChat",
    actionUrl: "weixin://dl/chat?Panuwat_LV999",
  },
  LINE: {
    id: "owenzaza555",
    qr: lineQr,
    actionLabel: "Add LINE",
    actionUrl: "https://line.me/ti/p/maEHq_0A4y",
  },
  Facebook: {
    id: "Panuwat Klinsukhon",
    qr: facebookQr,
    actionLabel: "Add Facebook",
    actionUrl: "https://www.facebook.com/share/1DTyGdbCtw/",
  },
  Gmail: {
    id: "panuwat.kl94@gmail.com",
    actionLabel: "Send Email Now!",
    actionUrl: "mailto:panuwat.kl94@gmail.com",
  },
} as const;

const profile = {
  firstname: "Panuwat",
  lastname: "Klinsukhon",
  nickname: "Owen",
  chineseName: "歐文",
  employeeCode: "A2618807",
  position: {
    en: "Intelligent Engineer (Level 2)",
    th: "วิศวกรอัจฉริยะ (ระดับ 2)",
    zh: "智能化师（Level 2）",
  },
  company: "Peng Shen",
  department: "-",
  gender: {
    en: "Male",
    th: "ชาย",
    zh: "男性",
  },
  nationality: {
    en: "Thai",
    th: "ไทย",
    zh: "泰國",
  },
  birthPlace: {
    en: "Thailand, Prachinburi",
    th: "ประเทศไทย ปราจีนบุรี",
    zh: "泰國，北欖府",
  },
  birthdate: "2004/05/30",
  maritalStatus: {
    en: "Single",
    th: "โสด",
    zh: "单身",
  },
  languages: {
    en: ["Thai", "English"],
    th: ["ไทย", "อังกฤษ"],
    zh: ["泰文", "英文"],
  },
  contacts: [
    { label: "WeChat", icon: MessageCircle },
    { label: "LINE", icon: MessageSquare },
    { label: "Facebook", icon: Facebook },
    { label: "Gmail", icon: Mail },
  ] as const,
};

const translations = {
  en: {
    title: "PERSONNEL_CARD",
    nickname: "Nickname",
    employeeCode: "Employee Code",
    position: "Position",
    birthdate: "Birthdate",
    birthplace: "Birthplace",
    nationality: "Nationality",
    gender: "Gender",
    maritalStatus: "Marital Status",
    languages: "Languages",
    contact: "Contact",
    years: "years",
  },
  th: {
    title: "บัตรประจำตัว",
    nickname: "ชื่อเล่น",
    employeeCode: "รหัสพนักงาน",
    position: "ตำแหน่ง",
    birthdate: "วันเกิด",
    birthplace: "สถานที่เกิด",
    nationality: "สัญชาติ",
    gender: "เพศ",
    maritalStatus: "สถานะภาพสมรส",
    languages: "ภาษา",
    contact: "ติดต่อ",
    years: "ปี",
  },
  zh: {
    title: "人事卡",
    nickname: "昵称",
    employeeCode: "员工编号",
    position: "职位",
    birthdate: "出生日期",
    birthplace: "出生地",
    nationality: "国籍",
    gender: "性别",
    maritalStatus: "婚姻状况",
    languages: "语言",
    contact: "联系",
    years: "岁",
  },
} as const;

function calculateAge(birthdate: string) {
  const [yStr, mStr, dStr] = birthdate.split("/");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const birth = new Date(y, m - 1, d);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { language } = useLanguage();
  const [age, setAge] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<
    keyof typeof contactDetails | null
  >(null);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  useEffect(() => {
    setAge(calculateAge(profile.birthdate));
  }, []);

  const t = translations[language as LanguageCode];

  const handleContactClick = (label: keyof typeof contactDetails) => {
    setSelectedContact(label);
  };

  const openContactAction = (label: keyof typeof contactDetails) => {
    const url = contactDetails[label].actionUrl;
    if (url.startsWith("http") || url.startsWith("mailto:")) {
      window.open(url, "_blank", "noopener,noreferrer");
      setSelectedContact(null);
      return;
    }

    window.location.href = url;
    setSelectedContact(null);
  };

  const handleCopyContact = async (value: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        setCopiedContact(selectedContact ?? null);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedContact(selectedContact ?? null);
    } catch {
      setCopiedContact(null);
    }

    window.setTimeout(() => setCopiedContact(null), 1200);
  };

  const rows = [
    { icon: User, label: t.employeeCode, value: profile.employeeCode },
    {
      icon: Briefcase,
      label: t.position,
      value: profile.position[language],
    },
    {
      icon: Calendar,
      label: t.birthdate,
      value: `${profile.birthdate}${age != null ? ` (${age} ${t.years})` : ""}`,
    },
    { icon: MapPin, label: t.birthplace, value: profile.birthPlace[language] },
    { icon: Globe, label: t.nationality, value: profile.nationality[language] },
    { icon: User, label: t.gender, value: profile.gender[language] },
    {
      icon: User,
      label: t.maritalStatus,
      value: profile.maritalStatus[language],
    },
    {
      icon: Languages,
      label: t.languages,
      value: profile.languages[language].join(", "),
    },
  ];

  return (
    <section className="grid-bg flex flex-1 items-center justify-center px-5 py-12">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-ink/15 bg-parchment shadow-panel">
        <div className="border-b-2 border-ink/15 bg-ink px-6 py-4 text-cream">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm tracking-widest">
              {t.title}
            </span>
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-mint" />
              <span className="size-2.5 rounded-full bg-gold" />
              <span className="size-2.5 rounded-full bg-copper" />
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="text-center">
            <h1 className="font-display text-4xl leading-none sm:text-5xl">
              <span className="chrome">{profile.firstname}</span>{" "}
              {profile.lastname}
            </h1>
            <p className="mt-2 font-display text-xl text-copper">
              {profile.chineseName}
            </p>
            <p className="mt-1 text-sm font-medium text-ink/60">
              {t.nickname}: {profile.nickname}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-cream/60 p-4"
              >
                <row.icon
                  className="mt-0.5 size-5 shrink-0 text-copper"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-ink">
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-ink/10 bg-cream/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
              {t.contact}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {profile.contacts.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => handleContactClick(c.label as keyof typeof contactDetails)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 bg-parchment px-3 py-1.5 text-sm font-medium text-ink/80 transition hover:border-copper hover:text-ink"
                >
                  <c.icon className="size-4 text-copper" aria-hidden="true" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-ink/15 bg-cream p-5 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl">{selectedContact}</h3>
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="rounded-full border border-ink/15 px-2.5 py-1 text-sm text-ink/70 hover:bg-parchment"
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            {(selectedContact === "WeChat" ||
              selectedContact === "LINE" ||
              selectedContact === "Facebook") && (
              <div className="mt-4 flex justify-center">
                <img
                  src={contactDetails[selectedContact].qr}
                  alt={
                    selectedContact === "WeChat"
                      ? "WeChat QR code"
                      : selectedContact === "LINE"
                        ? "LINE QR code"
                        : "Facebook QR code"
                  }
                  className="h-52 w-52 rounded-2xl border border-ink/15 bg-cream object-cover"
                />
              </div>
            )}

            <div className="mt-5 rounded-2xl border border-ink/15 bg-parchment/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                  {selectedContact === "WeChat"
                    ? "WeChat ID"
                    : selectedContact === "LINE"
                      ? "LINE ID"
                      : selectedContact === "Facebook"
                        ? "Facebook ID"
                        : "Contact ID"}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyContact(contactDetails[selectedContact].id)
                  }
                  className="rounded-full border border-ink/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-cream"
                >
                  {copiedContact === selectedContact ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-sm font-medium break-all">
                {contactDetails[selectedContact].id}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => openContactAction(selectedContact)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-copper"
              >
                {contactDetails[selectedContact].actionLabel}
              </button>
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-parchment"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
