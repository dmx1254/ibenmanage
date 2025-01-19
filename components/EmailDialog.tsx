"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Mail, PaperclipIcon, Send, SmileIcon, X } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDebouncedCallback } from "use-debounce";

import TooltipC from "./TooltipC";

// Emoji list
import { AttachedFile, emojis, navMain } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { getUsersEmail } from "@/lib/actions/patient.actions";
import { Skeleton } from "./ui/skeleton";
import {
  sendUserEmail,
  sendUserServers,
} from "@/lib/actions/verification.actions";
import { sendEmailForAllUsers } from "@/lib/actions/appointment.actions";

const EmailDialog = ({
  isShowText = false,
  email = "",
  lastnameS,
  firstnameS,
}: {
  isShowText?: boolean;
  email?: string;
  lastnameS?: string;
  firstnameS?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [to, setTo] = useState<string>("");
  const [emailsToSend, setEmailsToSend] = useState<string[]>([email]);
  const [lastEmails, setLastEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isLoadingEmail, setIsLoadingEmail] = useState<boolean>(false);
  const [isLoadingServers, setIsLoadingServers] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userEmails, setUsersEmails] = useState<
    { _id: string; email: string; lastname: string; firstname: string }[]
  >([]);

  const [allSendersLoader, setAllSendersLoader] = useState<boolean>(false);

  // const handleGetEmail = (email: string) => {
  //   setEmailsToSend([email]);
  // };

  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);

  const handleSearchChange = useDebouncedCallback(
    async (searchTerm: string) => {
      try {
        setIsEmailLoading(true);
        const results = await getUsersEmail(searchTerm);
        setUsersEmails(results);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsEmailLoading(false);
      }
    },
    600
  );

  useEffect(() => {
    const myLastEmails = window?.localStorage.getItem("lastEmails") ?? null;
    const lastEmails: string[] | null = myLastEmails
      ? JSON.parse(myLastEmails)
      : null;

    setLastEmails(lastEmails ?? []);
  }, []);

  const handleSendEmail = async () => {
    const emailFiltered = emailsToSend.filter((e) => e !== "");
    if (emailFiltered.length < 1 || !subject || !message) {
      toast.error("Veuillez remplir tous les champs", {
        style: {
          background: "#1A1D21",
          color: "#ef4444",
          border: "1px solid #363A3D",
        },
      });
    } else {
      try {
        setIsLoadingEmail(true);
        const result = await sendUserEmail(
          emailFiltered[0],
          message,
          lastnameS!,
          firstnameS!,
          subject,
          attachedFiles
        );
        if (result) {
          toast.success(result.message, {
            style: {
              background: "#1A1D21",
              color: "#22c55e",
              border: "1px solid #363A3D",
            },
          });
        }
      } catch (error: any) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        toast.error("Échec de l'envoi de l'email. Réessayez plus tard.", {
          style: {
            background: "#1A1D21",
            color: "#ef4444",
            border: "1px solid #363A3D",
          },
        });
      } finally {
        setIsLoadingEmail(false);
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      const filePromises = newFiles.map((file) => {
        return new Promise<AttachedFile>((resolve) => {
          // Spécifier le type AttachedFile
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name,
              content: reader.result, // Base64 content
              type: file.type,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      // Traitez tous les fichiers et mettez à jour l'état en une fois
      Promise.all(filePromises).then((base64Files: AttachedFile[]) => {
        setAttachedFiles((prevFiles) => [...prevFiles, ...base64Files]);

        toast.success(`${base64Files.length} fichier(s) ajouté(s)`, {
          style: {
            background: "#1A1D21",
            color: "#22c55e",
            border: "1px solid #363A3D",
          },
        });
      });
    }
  };

  const removeAttachedFile = (fileToRemove: string) => {
    setAttachedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileToRemove)
    );
  };

  const handleAddEmailTab = (email: string) => {
    setEmailsToSend((prevEmail) =>
      prevEmail.includes(email)
        ? prevEmail.filter((e) => e !== email)
        : [...prevEmail, email]
    );
  };

  const handleSendServers = async () => {
    if (emailsToSend.length < 1 || !subject) {
      toast.error("Le destinataire et l'objet ne doivent pas être vides.", {
        style: {
          background: "#1A1D21",
          color: "#ef4444",
          border: "1px solid #363A3D",
        },
      });
    } else {
      try {
        setIsLoadingServers(true);
        const response = await sendUserServers(
          userEmails[0].lastname,
          userEmails[0].firstname,
          emailsToSend,
          subject,
          message
        );
        if (response) {
          toast.success(response.successMessage, {
            style: {
              background: "#1A1D21",
              color: "#22c55e",
              border: "1px solid #363A3D",
            },
          });
          window.localStorage.setItem(
            "lastEmails",
            JSON.stringify(emailsToSend)
          );
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setIsLoadingServers(false);
      }
    }
  };

  const handleSendAllUsers = async () => {
    if (!subject || !message) {
      toast.error("L'objet et le message ne doivent pas être vides.", {
        style: {
          background: "#1A1D21",
          color: "#ef4444",
          border: "1px solid #363A3D",
        },
      });
    } else {
      try {
        setAllSendersLoader(true);
        const response = await sendEmailForAllUsers(subject, message);
        if (response) {
          toast.success(response.successMessage, {
            style: {
              background: "#1A1D21",
              color: "#22c55e",
              border: "1px solid #363A3D",
            },
          });
        }
      } catch (error) {
      } finally {
        setAllSendersLoader(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isShowText ? (
        <button
          className="flex items-center justify-center p-0.5 border rounded border-violet-300 text-violet-400 transition-all hover:text-violet-700"
          onClick={() => setIsOpen(true)}
        >
          <Send size={18} />
        </button>
      ) : (
        <Button
          className="text-white cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Mail className="mr-2 h-65 w-65" /> Envoyer un email
        </Button>
      )}

      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-400 border-dark-500">
        <DialogHeader>
          <DialogTitle>Nouveau Message</DialogTitle>
        </DialogHeader>
        <div className="flex items-start">
          <div className="flex flex-col items-center gap-1 w-10 h-full border-r pr-4 border-dark-500">
            {navMain.map((n, index) => (
              <TooltipC key={index} {...n} />
            ))}
          </div>
          <div className="flex flex-col items-start w-72 h-full px-4 gap-2 border-r pr-4 border-dark-500">
            <div>
              <span>Inbox</span>
            </div>
            <div className="w-full">
              <Input
                type="text"
                className="w-full border-dark-500 bg-dark-300"
                placeholder="Type to search..."
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSearchChange(e.target.value)
                }
              />
              <ScrollArea className="w-full h-full max-h-[400px] my-2">
                <div className="w-full flex flex-col items-start">
                  {isEmailLoading ? (
                    <div className="w-full flex flex-col items-start gap-3">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-3" />
                      ))}
                    </div>
                  ) : userEmails.length > 0 ? (
                    userEmails?.map((u) => (
                      <button
                        className="w-full flex items-start self text-zinc-400 hover:text-zinc-300 transition-all border-b border-dark-500 pb-2"
                        key={u._id}
                        onClick={() => handleAddEmailTab(u.email)}
                      >
                        {u.email}
                      </button>
                    ))
                  ) : lastEmails ? (
                    <button
                      className="w-full bg-dark-300 p-2 border-dark-500 text-green-500 rounded-[6px] text-sm font-semibold transition-colors hover:opacity-85"
                      onClick={() => setEmailsToSend(lastEmails)}
                    >
                      Selectionner le dernier envoie
                    </button>
                  ) : (
                    <span className="w-full text-white/80 text-sm p-4">
                      Aucun email trouvé, faites une recherche...
                    </span>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-white/90">À</Label>
              {/* <textarea
                value={emailsToSend.join(", ")}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destinataire"
                className="w-full rounded-[6px] border resize-none p-2 border-dark-500 bg-dark-300 text-light-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              /> */}
              <div className="w-full flex items-center gap-2 flex-wrap min-h-10 rounded-[6px] border resize-none p-2 border-dark-500 bg-dark-300 text-light-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                {emailsToSend.map((e, index) => (
                  <button
                    key={index}
                    className="inline-flex bg-dark-500 border-dark-400 p-1 rounded text-sm text-white/50"
                    onClick={() => handleAddEmailTab(e)}
                  >
                    {e}
                    <X size={16} className="mt-1 text-white/80" />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/90">Sujet</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Objet de l'email"
                className="border-dark-500 bg-dark-300 text-light-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/90">Message</Label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message..."
                className="w-full text-sm min-h-[200px] p-2 border border-dark-500 bg-dark-300 text-light-100 rounded-md resize-y focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {attachedFiles.length > 0 && (
              <div className="space-y-2">
                <Label className="text-white/90">Fichiers joints</Label>
                <div className="flex flex-wrap gap-2">
                  {attachedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-dark-500 px-2 py-1 rounded-md text-sm"
                    >
                      {file.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 p-0 h-4 w-4"
                        onClick={() => removeAttachedFile(file.name)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 bg-dark-300 rounded-[6px]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-dark-600 hover:bg-green-500 hover:text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PaperclipIcon className="h-5 w-5" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileAttachment}
                    multiple
                    className="hidden"
                  />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger className="border-none outline-none">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-dark-600 hover:bg-green-500 hover:text-white border-none"
                    >
                      <SmileIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 sm:w-96 border-none shadow-none">
                    <div className="absolute bottom-20 right-20 bg-dark-400 border border-dark-500 p-2 rounded-md flex flex-wrap w-full">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => handleEmojiSelect(emoji)}
                          className="text-xl m-1 hover:bg-dark-500 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-dark-600 hover:bg-green-500 hover:text-white"
                  onClick={handleSendServers}
                >
                  {isLoadingServers ? (
                    <Loader className="animate-spin text-dark-600" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>

              <Select>
                <SelectTrigger className="w-[180px] border-dark-500 bg-dark-300 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent className="bg-dark-400 border-dark-500">
                  <SelectItem value="low">Basse</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button
            onClick={handleSendAllUsers}
            variant="outline"
            className="text-orange-500 border-dark-500"
            disabled={allSendersLoader}
          >
            {allSendersLoader ? (
              <Loader className="text-white animate-spin" />
            ) : (
              "Envoyer à tous"
            )}
          </Button>
          <Button
            variant="outline"
            className="text-red-500 border-dark-500"
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </Button>
          <Button
            variant="outline"
            onClick={handleSendEmail}
            className="text-green-500 border-dark-500"
            disabled={isLoadingEmail}
          >
            {isLoadingEmail ? (
              <Loader className="text-white animate-spin" />
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" /> Envoyer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
