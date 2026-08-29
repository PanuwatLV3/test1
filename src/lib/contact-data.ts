import facebookQr from "@/assets/faebookqrcode.png";
import lineQr from "@/assets/lineqrcode.jfif";
import wechatQr from "@/assets/wechatqrcode.jfif";
import { Facebook, Mail, MessageCircle, MessageSquare } from "lucide-react";

export const contactDetails = {
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

export type ContactKey = keyof typeof contactDetails;

export const profile = {
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
  startWorkDate: "2026/05/05",
  responsibilities: [
    "EAP",
    "Test Auto Production Mode",
    "Lock/Unlock Single Machine Control",
    "Analysis Failure of Auto Production Mode",
  ],
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

export function toContactRouteParam(label: ContactKey) {
  return label.toLowerCase();
}

export function getContactKeyFromRouteParam(param?: string): ContactKey | undefined {
  if (!param) {
    return undefined;
  }

  const normalizedParam = param.toLowerCase();

  const match = Object.keys(contactDetails).find(
    (key) => key.toLowerCase() === normalizedParam,
  ) as ContactKey | undefined;

  return match;
}
