import { useQuery } from "@tanstack/react-query";

export function useCmsSettings() {
  return useQuery<Record<string, any>>({
    queryKey: ["/api/cms/settings"],
    staleTime: 60000,
  });
}

export function useCmsProblems() {
  return useQuery<any[]>({
    queryKey: ["/api/cms/problems"],
    staleTime: 60000,
  });
}

export function useCmsWhatWeDo() {
  return useQuery<any[]>({
    queryKey: ["/api/cms/whatwedo"],
    staleTime: 60000,
  });
}

export function useCmsTeam() {
  return useQuery<any[]>({
    queryKey: ["/api/cms/team"],
    staleTime: 60000,
  });
}

export function useCmsServices() {
  return useQuery<any[]>({
    queryKey: ["/api/cms/services"],
    staleTime: 60000,
  });
}
