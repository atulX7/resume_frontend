import { getSession, signOut } from "next-auth/react";
import { toast } from "sonner";

export enum ErrorType {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  USAGE_LIMIT = 'USAGE_LIMIT',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  SERVER_ERROR = 'SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  HEADER_TOO_LARGE = 'HEADER_TOO_LARGE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface ErrorResponse {
  success: boolean;
  error?: string;
  errorType?: ErrorType;
}

export class ErrorService {
  static async handleError(error: unknown): Promise<ErrorResponse> {
    console.error('Error occurred:', error);

    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('401')) {
        return await this.handleUnauthorizedError();
      }
      if (error.message.includes('403')) {
        return this.handleForbiddenError();
      }
      if (error.message.includes('Usage limit')) {
        return this.handleUsageLimitError();
      }
      if (error.message.includes('431')) {
        return this.handleHeaderTooLargeError();
      }
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return this.handleNetworkError();
    }

    // Default error handling
    return this.handleUnknownError(error);
  }

  private static async handleUnauthorizedError(): Promise<ErrorResponse> {
    toast.error("Session expired. Please log in again.");
    await signOut({ redirect: false });
    window.location.href = "/auth/login";
    return { 
      success: false, 
      error: 'Session expired', 
      errorType: ErrorType.SESSION_EXPIRED 
    };
  }

  private static handleForbiddenError(): ErrorResponse {
    toast.error("You don't have permission to perform this action.");
    return { 
      success: false, 
      error: 'Forbidden', 
      errorType: ErrorType.FORBIDDEN 
    };
  }

  private static handleUsageLimitError(): ErrorResponse {
    toast.error("You've reached your usage limit. Please upgrade your plan.");
    return { 
      success: false, 
      error: 'Usage limit reached', 
      errorType: ErrorType.USAGE_LIMIT 
    };
  }

  private static handleNetworkError(): ErrorResponse {
    toast.error("Network error occurred. Please check your connection and try again.");
    return { 
      success: false, 
      error: 'Network error', 
      errorType: ErrorType.NETWORK_ERROR 
    };
  }

  private static handleHeaderTooLargeError(): ErrorResponse {
    toast.error("Request header too large. Please try again with smaller data.");
    return { 
      success: false, 
      error: 'Request header too large', 
      errorType: ErrorType.HEADER_TOO_LARGE 
    };
  }

  private static handleUnknownError(error: unknown): ErrorResponse {
    toast.error("An unexpected error occurred. Please try again later.");
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      errorType: ErrorType.UNKNOWN_ERROR
    };
  }

  static async checkAuthorization(): Promise<string> {
    const session = await getSession();
    if (!session?.accessToken) {
      await this.handleUnauthorizedError();
      throw new Error("Unauthorized");
    }
    return session.accessToken;
  }
} 