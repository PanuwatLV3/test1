import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  Globe,
  Languages,
  MapPin,
  User,
} from "lucide-react";

import { contactDetails, profile, toContactRouteParam } from "@/lib/contact-data";
import { useLanguage, type LanguageCode } from "@/lib/i18n";

const title = "My Peng Shen Profile";
const description =
  "Panuwat Klinsukhon (Owen) — Intelligent Engineer personnel card.";


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
  const navigate = useNavigate();
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    setAge(calculateAge(profile.birthdate));
  }, []);

  const t = translations[language as LanguageCode];

  const handleContactClick = (label: keyof typeof contactDetails) => {
    navigate({
      to: "/contact/$contact",
      params: { contact: toContactRouteParam(label) },
    });
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

    </section>
  );
}
