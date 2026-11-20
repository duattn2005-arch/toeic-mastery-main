"use client";

import * as React from "react";
import { AppSidebar, type SidebarProfile } from "@/components/layout/app-sidebar";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { CommandPalette } from "@/components/layout/command-palette";
import { SiteThemeBackground } from "@/components/layout/site-theme-background";
import { WelcomeOfferModal } from "@/components/billing/welcome-offer-modal";
import { UpgradeNudgeModal } from "@/components/billing/upgrade-nudge-modal";
import { TrialOfferModal } from "@/components/billing/trial-offer-modal";
import type { ProTrialState } from "@/lib/services/pro-trial"; // type-only: erased at build time
import { QuestionMentorDock } from "@/components/mentor/question-mentor-dock";
import { getSiteTheme } from "@/lib/constants/site-themes";
import type { VocabularyReminder } from "@/lib/data/vocabulary";

export function AppShell({
  profile,
  vocabularyReminder,
  newMemberOfferDeadline,
  proTrial,
  siteThemeId,
  children,
}: {
  profile: SidebarProfile;
  vocabularyReminder: VocabularyReminder;
  /** ISO deadline when the current user is eligible for the welcome
   * discount, null otherwise — see getNewMemberOfferState. */
  newMemberOfferDeadline: string | null;
  /** Free-trial state — see getProTrialState. */
  proTrial: ProTrialState;
  /** Current site-wide Live theme id — see site-theme-gallery.tsx. */
  siteThemeId: string;
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const theme = getSiteTheme(siteThemeId);
  const isPro = profile.plan === "PRO" && (!profile.proExpiresAt || profile.proExpiresAt > new Date());

  // The palette follows the theme (globals.css, [data-site-theme]). The
  // wrapper below carries it from the first server render; <html> gets it
  // too so the body and portalled dialogs/popovers match.
  React.useEffect(() => {
    document.documentElement.dataset.siteTheme = theme.id;
    return () => {
      delete document.documentElement.dataset.siteTheme;
    };
  }, [theme.id]);

  return (
    <div data-site-theme={theme.id} className={`min-h-svh ${theme.media === "gradient" ? "bg-background" : ""}`}>
      <SiteThemeBackground themeId={siteThemeId} variant="ambient" />
      <AppSidebar profile={profile} siteThemeId={siteThemeId} />
      <div className="flex min-h-svh flex-col lg:pl-64">
        <TopHeader
          profile={profile}
          vocabularyReminder={vocabularyReminder}
          siteThemeId={siteThemeId}
          proTrial={proTrial}
          onOpenSearch={() => setSearchOpen(true)}
        />
        <main className="flex-1 px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
      </div>
      <MobileBottomNav />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <QuestionMentorDock equippedShopItemId={profile.equippedShopItemId} />
      {/* At most one upsell dialog: the free trial first (if never had Pro),
          nothing while the trial runs (the header pill counts it down), then
          the welcome discount (extended past a lapsed trial), then the
          generic nudge for anyone not on Pro. */}
      {proTrial.eligible ? (
        <TrialOfferModal hasWelcomeDiscount={!!newMemberOfferDeadline} />
      ) : proTrial.active ? null : newMemberOfferDeadline ? (
        <WelcomeOfferModal deadline={newMemberOfferDeadline} trialEnded={proTrial.used} />
      ) : (
        !isPro && <UpgradeNudgeModal />
      )}
    </div>
  );
}
